const { MissingParamError, InvalidParamError } = require('../../utils/errors')

class MathUseCase {
  constructor (additionUseCase) {
    this.validOperations = ['addition', 'subtraction', 'multiplication', 'division', 'remainder']
    this.additionUseCase = additionUseCase
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

    if (!this.additionUseCase) {
      throw new MissingParamError('additionUseCase')
    }

    if (!this.additionUseCase.add) {
      throw new InvalidParamError('additionUseCase')
    }

    this.additionUseCase.add(left)
  }

  isOperationValid (operation) {
    return this.validOperations.includes(operation)
  }
}

const makeSut = () => {
  class AdditionUseCaseSpy {
    add (left) {
      this.left = left
    }
  }
  const additionUseCaseSpy = new AdditionUseCaseSpy()
  const sut = new MathUseCase(additionUseCaseSpy)

  return {
    sut,
    additionUseCaseSpy
  }
}

describe('Math UseCase', () => {
  test('Should throw if no id is provided', () => {
    const { sut } = makeSut()
    expect(sut.calculate).toThrow(new MissingParamError('id'))
  })

  test('Should throw if no operation is provided', () => {
    const { sut } = makeSut()
    expect(() => sut.calculate('id')).toThrow(new MissingParamError('operation'))
  })

  test('Should throw if no left operator is provided', () => {
    const { sut } = makeSut()
    expect(() => sut.calculate('id', 'operation')).toThrow(new MissingParamError('left'))
  })

  test('Should throw if no right operator is provided', () => {
    const { sut } = makeSut()
    expect(() => sut.calculate('id', 'operation', 'left')).toThrow(new MissingParamError('right'))
  })

  test('Should throw if an invalid operation is provided', () => {
    const { sut } = makeSut()
    expect(() => sut.calculate('id', 'operation', 'left', 'right')).toThrow(new InvalidParamError('operation'))
  })

  test('Should return false if an invalid operation is provided to validate operation method', () => {
    const { sut } = makeSut()
    const isOperationValid = sut.isOperationValid('operation')
    expect(isOperationValid).toBe(false)
  })

  test('Should return true if addition operation is provided to validate operation method', () => {
    const { sut } = makeSut()
    const isOperationValid = sut.isOperationValid('addition')
    expect(isOperationValid).toBe(true)
  })

  test('Should return true if subtraction operation is provided to validate operation method', () => {
    const { sut } = makeSut()
    const isOperationValid = sut.isOperationValid('subtraction')
    expect(isOperationValid).toBe(true)
  })

  test('Should return true if multiplication operation is provided to validate operation method', () => {
    const { sut } = makeSut()
    const isOperationValid = sut.isOperationValid('multiplication')
    expect(isOperationValid).toBe(true)
  })

  test('Should return true if division operation is provided to validate operation method', () => {
    const { sut } = makeSut()
    const isOperationValid = sut.isOperationValid('division')
    expect(isOperationValid).toBe(true)
  })

  test('Should return true if remainder operation is provided to validate operation method', () => {
    const { sut } = makeSut()
    const isOperationValid = sut.isOperationValid('remainder')
    expect(isOperationValid).toBe(true)
  })

  test('Should call AdditionUseCase with correct left operator if addition operation is provided', () => {
    const { sut, additionUseCaseSpy } = makeSut()
    sut.calculate('id', 'addition', 'left', 'right')
    expect(additionUseCaseSpy.left).toEqual('left')
  })

  test('Should throw if no AdditionUseCase is provided', () => {
    const sut = new MathUseCase()
    expect(() => sut.calculate('id', 'addition', 'left', 'right')).toThrow(new MissingParamError('additionUseCase'))
  })

  test('Should throw if no AdditionUseCase has no add method', () => {
    const sut = new MathUseCase({})
    expect(() => sut.calculate('id', 'addition', 'left', 'right')).toThrow(new InvalidParamError('additionUseCase'))
  })
})
