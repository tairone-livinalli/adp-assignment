const MathRouter = require('./math-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  class MathUseCaseSpy {
    calculate (id, operation, left, right) {
      this.id = id
      this.operation = operation
      this.left = left
      this.right = right
    }
  }

  const mathUseCaseSpy = new MathUseCaseSpy()
  const sut = new MathRouter(mathUseCaseSpy)

  return {
    sut,
    mathUseCaseSpy
  }
}

describe('Math Router', () => {
  test('Should return 400 if no id is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        operation: 'multiplication',
        left: 2,
        right: 3
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('id'))
  })

  test('Should return 400 if no operation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'valid_id',
        left: 2,
        right: 3
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('operation'))
  })

  test('Should return 400 if no left operator is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'valid_id',
        operation: 'multiplication',
        right: 3
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('left'))
  })

  test('Should return 400 if no right operator is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'valid_id',
        operation: 'multiplication',
        left: 2
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('right'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call MathUseCase with correct params', () => {
    const { sut, mathUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        id: 'valid_id',
        operation: 'multiplication',
        left: 2,
        right: 3
      }
    }

    sut.route(httpRequest)

    expect(mathUseCaseSpy.id).toEqual(httpRequest.body.id)
    expect(mathUseCaseSpy.operation).toEqual(httpRequest.body.operation)
    expect(mathUseCaseSpy.left).toEqual(httpRequest.body.left)
    expect(mathUseCaseSpy.right).toEqual(httpRequest.body.right)
  })

  test('Should return 400 when an invalid operation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'valid_id',
        operation: 'invalid_operation',
        left: 2,
        right: 3
      }
    }

    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toEqual(400)
  })
})
