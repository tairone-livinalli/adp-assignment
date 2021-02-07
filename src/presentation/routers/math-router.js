const HttpResponse = require('../helpers/http-response')

module.exports = class MathRouter {
  constructor (mathUseCase) {
    this.mathUseCase = mathUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.mathUseCase || !this.mathUseCase.calculate || !this.mathUseCase.isOperationValid) {
      return HttpResponse.serverError()
    }

    const { id, operation, left, right } = httpRequest.body

    if (!id) {
      return HttpResponse.badRequest('id')
    }
    if (!operation) {
      return HttpResponse.badRequest('operation')
    }
    if (!left) {
      return HttpResponse.badRequest('left')
    }
    if (!right) {
      return HttpResponse.badRequest('right')
    }

    if (!this.mathUseCase.isOperationValid(operation)) {
      return HttpResponse.badRequestInvalid('operation')
    }

    const result = this.mathUseCase.calculate(id, operation, left, right)

    return HttpResponse.ok(result)
  }
}
