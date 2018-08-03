
var ApkReader = require('node-apk-parser')
var util = require('util')
const log = require('../utils/logger');

const parsing = (url) => {
  const manifest = ApkReader.readFile(url).readManifestSync()
  const reslut = util.inspect(manifest, { depth: null })
  const reslut1 =  JSON.parse(JSON.stringify(reslut));
  log.info(eval('(' + reslut + ')'));
  // let {versionName,package,versionCode} = JSON.parse(reslut)
  log.info(versionName,package,versionCode);
  return {
    versionName,//版本名称
    package, //包名
    versionCode  //版本编号
  }
}

module.exports = {
  parsing
}