// { sample
//   "id": "66df7d3d-8340-4efd-a528-b5204d02a864",
//   "operation": "multiplication",
//   "left": -3364257091338055,
//   "right": -6634491299249283
// }

class MathRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }

    const { id, operation } = httpRequest.body
    if (!id) {
      return HttpResponse.badRequest('id')
    }
    if (!operation) {
      return HttpResponse.badRequest('operation')
    }
  }
}

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

describe('Math Router', () => {
  test('should return 400 if no id is provided', () => {
    const sut = new MathRouter()
    const httpRequest = {
      body: {
        operation: 'multiplication',
        left: -3364257091338055,
        right: -6634491299249283
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('id'))
  })

  test('should return 400 if no operation is provided', () => {
    const sut = new MathRouter()
    const httpRequest = {
      body: {
        id: '66df7d3d-8340-4efd-a528-b5204d02a864',
        left: -3364257091338055,
        right: -6634491299249283
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('operation'))
  })

  test('should return 500 if no httpRequest is provided', () => {
    const sut = new MathRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return 500 if httpRequest has no body', () => {
    const sut = new MathRouter()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
})
