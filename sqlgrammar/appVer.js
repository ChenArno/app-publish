const grammar = {
  insert: 'INSERT INTO app_version(appName,ios,android,version,timestamp,createTime) VALUES(?,?,?,?,?,?)',
  queryAll: "select * from cgoods_msg ORDER BY id LIMIT ?,?"
}

module.exports = grammar