const {
  format
} = require('../utils');
const sql = require('../modles/sqlPool');
const sqlQuery = require('../sqlgrammar/appVer');
const moment = require('moment');
const log = require('../utils/logger');
const uploader = require('../modles/upload');
// const uploader = multer({ dest: "uploads" }); muilter.single('file'),
// //适用于单文件上传 muilter.array('file',num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。


const getVersion = (req, res, next) => {

  res.json(format({
    data: "jjk"
  }))
}

const addVersion = (req, res, next) => {
  let {
    appName,
    ios,
    android,
    version
  } = req.body;
  let timestamp, createTime;
  timestamp = createTime = moment().format('YYYY-MM-DD h:m:s');
  let appInfo = [appName, ios, android, version, timestamp, createTime];

  sql.execute(sqlQuery.insert, appInfo).then(res => {
    log.info(res);
    res.json(format({}))
  }).catch(err => {
    res.json(format({
      resCode: 3000,
      msh: 'error'
    }))
  });
}

const fileUpload = (req, res) => {
  log.info(req);
  const upload = uploader.single('file');
  upload(req, res, err => {
    if (err) {
      res.json(format({
        resCode: 3000,
        msg: err
      }))
      return log.error(err)
    }
    // console.log(req.file);
    if (req.file) {
      res.json(format({}))
    }
  })
}


module.exports = {
  getVersion,
  addVersion,
  fileUpload
}