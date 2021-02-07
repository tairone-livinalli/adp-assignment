const MissingParamError = require('./missing-param-error')
const InvalidParamError = require('./invalid-param-error')
const ServerError = require('./server-error')

module.exports = class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static badRequestInvalid (paramName) {
    return {
      statusCode: 400,
      body: new InvalidParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }
}
