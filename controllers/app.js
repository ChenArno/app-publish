const {
  format
} = require('../utils');
const sql = require('../modles/sqlPool');
const sqlQuery = require('../sqlgrammar/appVer');
const moment = require('moment');
const log = require('../utils/logger');
const anagle = require('../utils/anagleApp');
const uploader = require('../modles/upload');
// const uploader = multer({ dest: "uploads" }); muilter.single('file'),
// //适用于单文件上传 muilter.array('file',num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。
// anagle.parsing(process.cwd()+'/public/dowload/金蒜20180722-3449c9e5e332f1dbb81505cd739fbf3f.apk')

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
    version,
    path,
    desc,
    updateDesc,
    versionCode
  } = req.body;
  let timestamp, createTime;
  timestamp = createTime = moment().format('YYYY-MM-DD h:m:s');
  let appInfo = [appName, ios, android, version, timestamp, createTime, path, desc, updateDesc, versionCode];

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
      const reslut = anagle.parsing(process.cwd() + '/public/' + path);
      let data = {
        path: appPath,
        appName: reslut.package,
        version: reslut.versionName,
        versionCode: reslut.versionCode
      }
      console.log(data);
      res.json(format({
        data
      }))
    }
  })
}


module.exports = {
  getVersion,
  addVersion,
  fileUpload
}