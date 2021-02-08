const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class MathRouter {
  constructor (mathUseCase) {
    this.mathUseCase = mathUseCase
  }

  route (httpRequest) {
    try {
      const { id, operation, left, right } = httpRequest.body

      if (!id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }
      if (!operation) {
        return HttpResponse.badRequest(new MissingParamError('operation'))
      }
      if (!left) {
        return HttpResponse.badRequest(new MissingParamError('left'))
      }
      if (!right) {
        return HttpResponse.badRequest(new MissingParamError('right'))
      }

      if (!this.mathUseCase.isOperationValid(operation)) {
        return HttpResponse.badRequest(new InvalidParamError('operation'))
      }

      const result = this.mathUseCase.calculate(id, operation, left, right)

      return HttpResponse.ok(result)
    } catch (e) {
      console.error(e)
      return HttpResponse.serverError()
    }
  }
}
