const format = ({resCode = 2000, msg = 'success', data = {},resultStatus = true}) => {
  return {
      resCode,
      msg,
      data,
      resultStatus
  }
}


module.exports = {
  format
}