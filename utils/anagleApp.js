var ApkReader = require("node-apk-parser");
var util = require('util')
const log = require('../utils/logger');

const parsing = (url) => {
  const manifest = ApkReader.readFile(url).readManifestSync()
  let {versionName,package,versionCode} = manifest
  return {
    versionCode,
    versionName,
    packageName:package
  }
}

module.exports = {
  parsing
}