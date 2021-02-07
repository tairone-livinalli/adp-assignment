const MathRouter = require('./math-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  return new MathRouter()
}

describe('Math Router', () => {
  test('should return 400 if no id is provided', () => {
    const sut = makeSut()
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
    const sut = makeSut()
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

  test('should return 400 if no left operator is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        id: '66df7d3d-8340-4efd-a528-b5204d02a864',
        operation: 'multiplication',
        right: -6634491299249283
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('left'))
  })

  test('should return 400 if no right operator is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        id: '66df7d3d-8340-4efd-a528-b5204d02a864',
        operation: 'multiplication',
        left: -3364257091338055
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('right'))
  })

  test('should return 500 if no httpRequest is provided', () => {
    const sut = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('should return 500 if httpRequest has no body', () => {
    const sut = makeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
})
