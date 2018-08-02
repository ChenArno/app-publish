
module.exports = {
  mysql: {
    host: "192.168.2.161",
    user: "root",
    password: "root123",
    database: "app_db",
    connectionLimit: 10,
    port: 3306,
    waitForConnections: false
  },
  upload: {
    path: process.cwd() + '/public/dowload'
  }
}