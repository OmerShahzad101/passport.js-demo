exports.errorLogger = (error, request, response, next) => {
      console.log( `error ${error.message}`) 
      next(error) // calling next middleware
}
    
exports.errorResponder = (error, request, response, next) => {
      response.header("Content-Type", 'application/json')
      const status = error.status || 400
      response.status(status).send(error.message)
}
    
exports.invalidPathHandler = (request, response, next) => {
      response.status(400)
      response.send('invalid path')
}