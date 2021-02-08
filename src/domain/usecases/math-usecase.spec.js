const { MissingParamError, InvalidParamError } = require('../../utils/errors')

class MathUseCase {
  constructor () {
    this.validOperations = ['addition', 'subtraction', 'multiplication', 'division', 'remainder']
  }

  calculate (id, operation, left, right) {
    if (!id) {
      throw new MissingParamError('id')
    }
    if (!operation) {
      throw new MissingParamError('operation')
    }
    if (!left) {
      throw new MissingParamError('left')
    }
    if (!right) {
      throw new MissingParamError('right')
    }
    if (!this.isOperationValid(operation)) {
      throw new InvalidParamError('operation')
    }
  }

  isOperationValid (operation) {
    return this.validOperations.includes(operation)
  }
}

describe('Math UseCase', () => {
  test('Should throw if no id is provided', () => {
    const sut = new MathUseCase()
    expect(sut.calculate).toThrow(new MissingParamError('id'))
  })

  test('Should throw if no operation is provided', () => {
    const sut = new MathUseCase()
    expect(() => sut.calculate('id')).toThrow(new MissingParamError('operation'))
  })

  test('Should throw if no left operator is provided', () => {
    const sut = new MathUseCase()
    expect(() => sut.calculate('id', 'operation')).toThrow(new MissingParamError('left'))
  })

  test('Should throw if no right operator is provided', () => {
    const sut = new MathUseCase()
    expect(() => sut.calculate('id', 'operation', 'left')).toThrow(new MissingParamError('right'))
  })

  test('Should throw if an invalid operation is provided', () => {
    const sut = new MathUseCase()
    expect(() => sut.calculate('id', 'operation', 'left', 'right')).toThrow(new InvalidParamError('operation'))
  })

  test('Should return false if an invalid operation is provided to validate operation method', () => {
    const sut = new MathUseCase()
    const isOperationValid = sut.isOperationValid('operation')
    expect(isOperationValid).toBe(false)
  })

  test('Should return true if addition operation is provided to validate operation method', () => {
    const sut = new MathUseCase()
    const isOperationValid = sut.isOperationValid('addition')
    expect(isOperationValid).toBe(true)
  })
})
