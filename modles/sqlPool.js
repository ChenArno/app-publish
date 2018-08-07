const mysql = require("mysql");
const db = require('../config')
const async = require("async");
const log = require('../utils/logger');

log.info(process.env.NODE_ENV);
const config = (process.env.NODE_ENV == 'production') ? db.mysql.production : db.mysql.development
const pool = mysql.createPool(config);
//第一条查询
const firstQuery = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.query(sql, params, (error, res) => {
        connection.release();
        if (error) return reject(error)
        resolve(res[0] || null);
      })
    })
  })
}
//单条查询
const singleQuery = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.query(sql, params, (error, res) => {
        connection.release();
        if (error) return reject(error)
        for (let i in res[0]) {
          resolve(res[0][i] || null);
          return
        }
        resolve(null);
      })
    })
  })
}

//事务查询
const execute = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        log.error(err)
        reject(err);
        return
      }
      connection.query(sql, params, (error, res) => {
        connection.release();
        if (error) {
          log.error(error)
          reject(error)
          return
        }
        log.info("执行事务成功:" + sql + "/" + params)
        resolve(res);
      })
    })
  })
}

//多条事务查询
const execTrans = (sqlLists) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        log.error(error)
        reject(error);
        return
      }
      connection.beginTransaction(err => {
        if (err) {
          log.error(err)
          reject(err);
          return
        }
        log.info("开始执行transaction，共执行" + sqlLists.length + "条数据")
        const funcAry = sqlLists.map(sql_param => {
          return cb => {
            connection.query(sql_param.sql, sql_param.params, (tErr, rows, fields) => {
              if (tErr) {
                connection.rollback(() => {
                  log.error("执行事务失败，" + sql_param + "，ERROR：" + tErr)
                  throw tErr;
                })
              } else {
                return cb(null, 'ok')
              }
            })
          }
        })

        async.series(funcAry, (e, result) => {
          if (e) {
            connection.rollback(err => {
              log.error("transaction error: " + err);
              connection.release();
              return reject(err);
            })
          } else {
            connection.commit((err, info) => {
              if (err) {
                connection.rollback((err) => {
                  log.error("执行事务失败，: " + err);
                  connection.release();
                  return reject(err);
                });
              } else {
                connection.release();
                return resolve(info)
              }
            })
          }
        })
      })
    })
  })
}

module.exports = {
  firstQuery,
  singleQuery,
  execute,
  execTrans
}