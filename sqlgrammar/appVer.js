const grammar = {
  insert: 'INSERT INTO app_version(appName,ios,android,version,timestamp,createTime,path,desc,updateDesc,versionCode) VALUES(?,?,?,?,?,?,?,?,?,?)',
  queryAll: "select * from cgoods_msg ORDER BY id LIMIT ?,?"
}

module.exports = grammar