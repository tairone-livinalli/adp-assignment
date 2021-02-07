const MathRouter = require('./math-router')
const MissingParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error')
const ServerError = require('../helpers/server-error')

const makeSut = () => {
  class MathUseCaseSpy {
    calculate (id, operation, left, right) {
      this.id = id
      this.operation = operation
      this.left = left
      this.right = right

      const result = this.left * this.right

      return { id, result }
    }

    isOperationValid () {
      return true
    }
  }

  const mathUseCaseSpy = new MathUseCaseSpy()
  const sut = new MathRouter(mathUseCaseSpy)

  return {
    sut,
    mathUseCaseSpy
  }
}

const makeSutWithError = () => {
  class MathUseCaseSpy {
    calculate () {
      throw new Error()
    }

    isOperationValid () {
      throw new Error()
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
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if httpRequest has no body', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
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
    const { sut, mathUseCaseSpy } = makeSut()
    mathUseCaseSpy.isOperationValid = () => { return false }

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
    expect(httpResponse.body).toEqual(new InvalidParamError('operation'))
  })

  test('Should return 200 when valid httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        id: 'valid_id',
        operation: 'multiplication',
        left: 2,
        right: 3
      }
    }

    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body.id).toEqual(httpRequest.body.id)
    expect(httpResponse.body.result).toEqual(6)
  })

  test('Should return 500 if no MathUseCase is provided', () => {
    const sut = new MathRouter()
    const httpRequest = {
      body: {
        id: 'any_id',
        operation: 'any_operation',
        left: 2,
        right: 3
      }
    }

    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if MathUseCase has no calculate method', () => {
    const sut = new MathRouter({})
    const httpRequest = {
      body: {
        id: 'any_id',
        operation: 'any_operation',
        left: 2,
        right: 3
      }
    }

    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if MathUseCase has no isOperationValid method', () => {
    const calculate = () => {}
    const sut = new MathRouter({ calculate })
    const httpRequest = {
      body: {
        id: 'any_id',
        operation: 'any_operation',
        left: 2,
        right: 3
      }
    }

    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if MathUseCase throws', () => {
    const { sut } = makeSutWithError()
    const httpRequest = {
      body: {
        id: 'any_id',
        operation: 'any_operation',
        left: 2,
        right: 3
      }
    }

    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toEqual(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
