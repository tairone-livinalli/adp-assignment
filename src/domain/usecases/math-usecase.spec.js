const { MissingParamError, InvalidParamError } = require('../../utils/errors')

class MathUseCase {
  constructor (additionUseCase, subtractionUseCase, multiplicationUseCase, divisionUseCase, remainderUseCase) {
    this.validOperations = ['addition', 'subtraction', 'multiplication', 'division', 'remainder']
    this.additionUseCase = additionUseCase
    this.subtractionUseCase = subtractionUseCase
    this.multiplicationUseCase = multiplicationUseCase
    this.divisionUseCase = divisionUseCase
    this.remainderUseCase = remainderUseCase
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

    if (!this.subtractionUseCase) {
      throw new MissingParamError('subtractionUseCase')
    }

    if (!this.subtractionUseCase.sub) {
      throw new InvalidParamError('subtractionUseCase')
    }

    if (!this.multiplicationUseCase) {
      throw new MissingParamError('multiplicationUseCase')
    }

    if (!this.multiplicationUseCase.multiply) {
      throw new InvalidParamError('multiplicationUseCase')
    }

    if (!this.divisionUseCase) {
      throw new MissingParamError('divisionUseCase')
    }

    if (!this.divisionUseCase.divide) {
      throw new InvalidParamError('divisionUseCase')
    }

    if (!this.remainderUseCase) {
      throw new MissingParamError('remainderUseCase')
    }

    if (!this.remainderUseCase.rest) {
      throw new InvalidParamError('remainderUseCase')
    }

    this.left = left
    this.right = right

    this[operation]()
  }

  addition () {
    this.additionUseCase.add(this.left, this.right)
  }

  subtraction () {
    this.subtractionUseCase.sub(this.left, this.right)
  }

  multiplication () {
    this.multiplicationUseCase.multiply(this.left, this.right)
  }

  division () {
    this.divisionUseCase.divide(this.left, this.right)
  }

  remainder () {
    this.remainderUseCase.rest(this.left, this.right)
  }

  isOperationValid (operation) {
    return this.validOperations.includes(operation)
  }
}

const makeSut = () => {
  class AdditionUseCaseSpy {
    add (left, right) {
      this.left = left
      this.right = right
    }
  }
  class SubtractionUseCaseSpy {
    sub (left, right) {
      this.left = left
      this.right = right
    }
  }
  class MultiplicationUseCaseSpy {
    multiply (left, right) {
      this.left = left
      this.right = right
    }
  }
  class DivisionUseCaseSpy {
    divide (left, right) {
      this.left = left
      this.right = right
    }
  }
  class RemainderUseCaseSpy {
    rest (left, right) {
      this.left = left
      this.right = right
    }
  }
  const additionUseCaseSpy = new AdditionUseCaseSpy()
  const subtractionUseCaseSpy = new SubtractionUseCaseSpy()
  const multiplicationUseCaseSpy = new MultiplicationUseCaseSpy()
  const divisionUseCaseSpy = new DivisionUseCaseSpy()
  const remainderUseCaseSpy = new RemainderUseCaseSpy()
  const sut = new MathUseCase(additionUseCaseSpy, subtractionUseCaseSpy, multiplicationUseCaseSpy, divisionUseCaseSpy, remainderUseCaseSpy)

  return {
    sut,
    additionUseCaseSpy,
    subtractionUseCaseSpy,
    multiplicationUseCaseSpy,
    divisionUseCaseSpy,
    remainderUseCaseSpy
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

  test('Should call AdditionUseCase with correct right operator if addition operation is provided', () => {
    const { sut, additionUseCaseSpy } = makeSut()
    sut.calculate('id', 'addition', 'left', 'right')
    expect(additionUseCaseSpy.right).toEqual('right')
  })

  test('Should throw if no AdditionUseCase is provided', () => {
    const sut = new MathUseCase()
    expect(() => sut.calculate('id', 'addition', 'left', 'right')).toThrow(new MissingParamError('additionUseCase'))
  })

  test('Should throw if no AdditionUseCase has no add method', () => {
    const sut = new MathUseCase({})
    expect(() => sut.calculate('id', 'addition', 'left', 'right')).toThrow(new InvalidParamError('additionUseCase'))
  })

  test('Should call SubtractionUseCase with correct left operator if subtraction operation is provided', () => {
    const { sut, subtractionUseCaseSpy } = makeSut()
    sut.calculate('id', 'subtraction', 'left', 'right')
    expect(subtractionUseCaseSpy.left).toEqual('left')
  })

  test('Should call SubtractionUseCase with correct right operator if subtraction operation is provided', () => {
    const { sut, subtractionUseCaseSpy } = makeSut()
    sut.calculate('id', 'subtraction', 'left', 'right')
    expect(subtractionUseCaseSpy.right).toEqual('right')
  })

  test('Should throw if no SubtractionUseCase is provided', () => {
    const sut = new MathUseCase({ add: {} })
    expect(() => sut.calculate('id', 'subtraction', 'left', 'right')).toThrow(new MissingParamError('subtractionUseCase'))
  })

  test('Should throw if no SubtractionUseCase has no sub method', () => {
    const sut = new MathUseCase({ add: {} }, {})
    expect(() => sut.calculate('id', 'subtraction', 'left', 'right')).toThrow(new InvalidParamError('subtractionUseCase'))
  })

  test('Should call MultiplicationUseCase with correct left operator if multiplication operation is provided', () => {
    const { sut, multiplicationUseCaseSpy } = makeSut()
    sut.calculate('id', 'multiplication', 'left', 'right')
    expect(multiplicationUseCaseSpy.left).toEqual('left')
  })

  test('Should call MultiplicationUseCase with correct right operator if multiplication operation is provided', () => {
    const { sut, multiplicationUseCaseSpy } = makeSut()
    sut.calculate('id', 'multiplication', 'left', 'right')
    expect(multiplicationUseCaseSpy.right).toEqual('right')
  })

  test('Should throw if no MultiplicationUseCase is provided', () => {
    const sut = new MathUseCase({ add: {} }, { sub: {} })
    expect(() => sut.calculate('id', 'multiplication', 'left', 'right')).toThrow(new MissingParamError('multiplicationUseCase'))
  })

  test('Should throw if no MultiplicationUseCase has no sub method', () => {
    const sut = new MathUseCase({ add: {} }, { sub: {} }, { })
    expect(() => sut.calculate('id', 'multiplication', 'left', 'right')).toThrow(new InvalidParamError('multiplicationUseCase'))
  })

  test('Should call DivisionUseCase with correct left operator if division operation is provided', () => {
    const { sut, divisionUseCaseSpy } = makeSut()
    sut.calculate('id', 'division', 'left', 'right')
    expect(divisionUseCaseSpy.left).toEqual('left')
  })

  test('Should call DivisionUseCase with correct right operator if division operation is provided', () => {
    const { sut, divisionUseCaseSpy } = makeSut()
    sut.calculate('id', 'division', 'left', 'right')
    expect(divisionUseCaseSpy.right).toEqual('right')
  })

  test('Should throw if no DivisionUseCase is provided', () => {
    const sut = new MathUseCase({ add: {} }, { sub: {} }, { multiply: {} })
    expect(() => sut.calculate('id', 'division', 'left', 'right')).toThrow(new MissingParamError('divisionUseCase'))
  })

  test('Should throw if no DivisionUseCase has no sub method', () => {
    const sut = new MathUseCase({ add: {} }, { sub: {} }, { multiply: {} }, {})
    expect(() => sut.calculate('id', 'division', 'left', 'right')).toThrow(new InvalidParamError('divisionUseCase'))
  })

  test('Should call RemainderUseCase with correct left operator if remainder operation is provided', () => {
    const { sut, remainderUseCaseSpy } = makeSut()
    sut.calculate('id', 'remainder', 'left', 'right')
    expect(remainderUseCaseSpy.left).toEqual('left')
  })

  test('Should call RemainderUseCase with correct right operator if remainder operation is provided', () => {
    const { sut, remainderUseCaseSpy } = makeSut()
    sut.calculate('id', 'remainder', 'left', 'right')
    expect(remainderUseCaseSpy.right).toEqual('right')
  })

  test('Should throw if no RemainderUseCase is provided', () => {
    const sut = new MathUseCase({ add: {} }, { sub: {} }, { multiply: {} }, { divide: {} })
    expect(() => sut.calculate('id', 'remainder', 'left', 'right')).toThrow(new MissingParamError('remainderUseCase'))
  })

  test('Should throw if no RemainderUseCase has no sub method', () => {
    const sut = new MathUseCase({ add: {} }, { sub: {} }, { multiply: {} }, { divide: {} }, {})
    expect(() => sut.calculate('id', 'remainder', 'left', 'right')).toThrow(new InvalidParamError('remainderUseCase'))
  })
})
