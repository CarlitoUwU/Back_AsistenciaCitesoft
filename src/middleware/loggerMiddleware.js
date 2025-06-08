const logger = (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log(req.headers.cookie)
  console.log('-----------------------------------------------')
  next()
}

module.exports = logger
