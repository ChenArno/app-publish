const format = ({
  resCode = 2000,
  msg = 'success',
  data = {},
  resultStatus = true,
  count
}) => {
  let pomse = {
    resCode,
    msg,
    data,
    resultStatus
  }
  if(count){
    pomse.count = count
  }
  return pomse
}


module.exports = {
  format
}