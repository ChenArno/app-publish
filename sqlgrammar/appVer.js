const grammar = {
  insert: 'INSERT INTO app_version(appName,packageName,ios,android,version,updateTime,createTime,path,introduce,updateDesc,versionCode) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
  queryNum: "select * from app_version ORDER BY id LIMIT ?,?",
  queryAll:"select * from app_version ORDER BY versionCode,createTime desc",
  deleteById:"DELETE from app_version WHERE id = ?"
}

module.exports = grammar