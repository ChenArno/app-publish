const {
  format
} = require('../utils');
const sql = require('../modles/sqlPool');
const sqlQuery = require('../sqlgrammar/appVer');
const moment = require('moment');
const log = require('../utils/logger');
const anagle = require('../utils/anagleApp');
const uploader = require('../modles/upload');
const config = require('../config');
const {
  dateFormat
} = require('../utils/tools');
// const uploader = multer({ dest: "uploads" }); muilter.single('file'),
// //适用于单文件上传 muilter.array('file',num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。
// anagle.parsing(process.cwd()+'/public/dowload/金蒜20180805.apk')

const getVersion = (req, res, next) => {
  sql.execute(sqlQuery.queryAll, []).then(r => {
    let data = r.map(x => {
      x.updateTime = dateFormat(x.updateTime);
      x.createTime = dateFormat(x.createTime);
      return x
    })
    res.json(format({
      count: r.length,
      data
    }))
  }).catch(err => {
    res.json(format({
      resCode: 3000,
      msh: 'error'
    }))
  });
}

const addVersion = (req, res, next) => {
  let {
    appName,
    packageName,
    ios,
    android,
    version,
    path,
    introduce,
    updateDesc,
    versionCode
  } = req.body;
  ios = ios ? ios : 0;
  android = android ? android : 0
  let updateTime, createTime;
  updateTime = createTime = moment().format('YYYY-MM-DD h:m:s');
  let appInfo = [appName, packageName, ios, android, version, updateTime, createTime, path, introduce, updateDesc, versionCode];

  sql.execute(sqlQuery.insert, appInfo).then(r => {
    log.info(r);
    res.json(format({}))
  }).catch(err => {
    res.json(format({
      resCode: 3000,
      msh: 'error'
    }))
  });
}

const fileUpload = (req, res) => {
  const upload = uploader.single('file');
  upload(req, res, err => {
    if (err) {
      res.json(format({
        resCode: 3000,
        msg: err
      }))
      return log.error(err)
    }
    if (req.file) {
      let path = req.file.path.split('public/')[1];
      let appPath = req.protocol + "://" + req.headers.host + "/" + path;
      let {
        packageName,
        versionName,
        versionCode
      } = anagle.parsing(process.cwd() + '/public/' + path);
      let data = {
        path: appPath,
        appName: config.appName,
        packageName,
        version: versionName,
        versionCode
      }
      // console.log(data);
      res.json(format({
        data
      }))
    }
  })
}

const deleteItem = (req, res, next) => {
  const idArr = req.body;
  let arr = idArr.map(val => {
    return {
      sql: sqlQuery.deleteById,
      params: [val]
    }
  })
  sql.execTrans(arr).then(info => {
    res.json(format({
      msg: "删除数据成功"
    }))
  }).catch(err => {
    res.json(format({
      msg: err,
      resCode: 3001
    }))
  })
}


module.exports = {
  getVersion,
  addVersion,
  fileUpload,
  deleteItem
}