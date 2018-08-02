const format = ({resCode = 2000, msg = 'success', data = {}}) => {
  return {
      resCode,
      msg,
      data
  }
}


module.exports = {
  format
}