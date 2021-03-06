const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const MathUseCase = require('./math-usecase')

const makeAdditionUseCase = () => {
  class AdditionUseCaseSpy {
    add (left, right) {
      this.left = left
      this.right = right
      return true
    }
  }

  return new AdditionUseCaseSpy()
}

const makeAdditionUseCaseWithError = () => {
  class AdditionUseCaseSpy {
    add () {
      throw new Error()
    }
  }

  return new AdditionUseCaseSpy()
}

const makeSubtractionUseCase = () => {
  class SubtractionUseCaseSpy {
    sub (left, right) {
      this.left = left
      this.right = right
      return true
    }
  }

  return new SubtractionUseCaseSpy()
}

const makeSubtractionUseCaseWithError = () => {
  class SubtractionUseCaseSpy {
    sub () {
      throw new Error()
    }
  }

  return new SubtractionUseCaseSpy()
}

const makeMultiplicationUseCase = () => {
  class MultiplicationUseCaseSpy {
    multiply (left, right) {
      this.left = left
      this.right = right
      return true
    }
  }

  return new MultiplicationUseCaseSpy()
}

const makeMultiplicationUseCaseWithError = () => {
  class MultiplicationUseCaseSpy {
    multiply () {
      throw new Error()
    }
  }

  return new MultiplicationUseCaseSpy()
}

const makeDivisionUseCase = () => {
  class DivisionUseCaseSpy {
    divide (left, right) {
      this.left = left
      this.right = right
      return true
    }
  }

  return new DivisionUseCaseSpy()
}

const makeDivisionUseCaseWithError = () => {
  class DivisionUseCaseSpy {
    divide () {
      throw new Error()
    }
  }

  return new DivisionUseCaseSpy()
}

const makeRemainderUseCase = () => {
  class RemainderUseCaseSpy {
    rest (left, right) {
      this.left = left
      this.right = right
      return true
    }
  }

  return new RemainderUseCaseSpy()
}

const makeRemainderUseCaseWithError = () => {
  class RemainderUseCaseSpy {
    rest () {
      throw new Error()
    }
  }

  return new RemainderUseCaseSpy()
}

const makeSut = () => {
  const additionUseCaseSpy = makeAdditionUseCase()
  const subtractionUseCaseSpy = makeSubtractionUseCase()
  const multiplicationUseCaseSpy = makeMultiplicationUseCase()
  const divisionUseCaseSpy = makeDivisionUseCase()
  const remainderUseCaseSpy = makeRemainderUseCase()
  const sut = new MathUseCase({
    additionUseCase: additionUseCaseSpy,
    subtractionUseCase: subtractionUseCaseSpy,
    multiplicationUseCase: multiplicationUseCaseSpy,
    divisionUseCase: divisionUseCaseSpy,
    remainderUseCase: remainderUseCaseSpy
  })

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

  test('Should return null if AdditionUseCase returns null', () => {
    const { sut, additionUseCaseSpy } = makeSut()
    additionUseCaseSpy.add = () => { return null }
    const { result } = sut.calculate('id', 'addition', 'left', 'right')
    expect(result).toBeNull()
  })

  test('Should throw if no dependency is provided', () => {
    const sut = new MathUseCase()
    expect(sut.calculate).toThrow()
  })

  test('Should throw if no AdditionUseCase is provided', () => {
    const sut = new MathUseCase({})
    expect(() => sut.calculate('id', 'addition', 'left', 'right')).toThrow(new MissingParamError('additionUseCase'))
  })

  test('Should throw if no AdditionUseCase has no add method', () => {
    const sut = new MathUseCase({ additionUseCase: {} })
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

  test('Should return null if SubtractionUseCase returns null', () => {
    const { sut, subtractionUseCaseSpy } = makeSut()
    subtractionUseCaseSpy.sub = () => { return null }
    const { result } = sut.calculate('id', 'subtraction', 'left', 'right')
    expect(result).toBeNull()
  })

  test('Should throw if no SubtractionUseCase is provided', () => {
    const sut = new MathUseCase({ additionUseCase: { add: {} } })
    expect(() => sut.calculate('id', 'subtraction', 'left', 'right')).toThrow(new MissingParamError('subtractionUseCase'))
  })

  test('Should throw if no SubtractionUseCase has no sub method', () => {
    const sut = new MathUseCase({ additionUseCase: { add: {} }, subtractionUseCase: {} })
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

  test('Should return null if MultiplicationUseCase returns null', () => {
    const { sut, multiplicationUseCaseSpy } = makeSut()
    multiplicationUseCaseSpy.multiply = () => { return null }
    const { result } = sut.calculate('id', 'multiplication', 'left', 'right')
    expect(result).toBeNull()
  })

  test('Should throw if no MultiplicationUseCase is provided', () => {
    const sut = new MathUseCase({ additionUseCase: { add: {} }, subtractionUseCase: { sub: {} } })
    expect(() => sut.calculate('id', 'multiplication', 'left', 'right')).toThrow(new MissingParamError('multiplicationUseCase'))
  })

  test('Should throw if no MultiplicationUseCase has no multiply method', () => {
    const sut = new MathUseCase({ additionUseCase: { add: {} }, subtractionUseCase: { sub: {} }, multiplicationUseCase: {} })
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

  test('Should return null if DivisionUseCase returns null', () => {
    const { sut, divisionUseCaseSpy } = makeSut()
    divisionUseCaseSpy.divide = () => { return null }
    const { result } = sut.calculate('id', 'division', 'left', 'right')
    expect(result).toBeNull()
  })

  test('Should throw if no DivisionUseCase is provided', () => {
    const sut = new MathUseCase({ additionUseCase: { add: {} }, subtractionUseCase: { sub: {} }, multiplicationUseCase: { multiply: {} } })
    expect(() => sut.calculate('id', 'division', 'left', 'right')).toThrow(new MissingParamError('divisionUseCase'))
  })

  test('Should throw if no DivisionUseCase has no sub method', () => {
    const sut = new MathUseCase({ additionUseCase: { add: {} }, subtractionUseCase: { sub: {} }, multiplicationUseCase: { multiply: {} }, divisionUseCase: {} })
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

  test('Should return null if RemainderUseCase returns null', () => {
    const { sut, remainderUseCaseSpy } = makeSut()
    remainderUseCaseSpy.rest = () => { return null }
    const { result } = sut.calculate('id', 'remainder', 'left', 'right')
    expect(result).toBeNull()
  })

  test('Should throw if no RemainderUseCase is provided', () => {
    const sut = new MathUseCase({ additionUseCase: { add: {} }, subtractionUseCase: { sub: {} }, multiplicationUseCase: { multiply: {} }, divisionUseCase: { divide: {} } })
    expect(() => sut.calculate('id', 'remainder', 'left', 'right')).toThrow(new MissingParamError('remainderUseCase'))
  })

  test('Should throw if no RemainderUseCase has no sub method', () => {
    const sut = new MathUseCase({ additionUseCase: { add: {} }, subtractionUseCase: { sub: {} }, multiplicationUseCase: { multiply: {} }, divisionUseCase: { divide: {} }, remainderUseCase: {} })
    expect(() => sut.calculate('id', 'remainder', 'left', 'right')).toThrow(new InvalidParamError('remainderUseCase'))
  })

  test('Should return a correct object if Addition operation is successfully called', () => {
    const { sut } = makeSut()
    const additionResult = sut.calculate('id', 'addition', 'left', 'right')
    expect(additionResult.id).toEqual(sut.id)
    expect(additionResult.result).toBeTruthy()
  })

  test('Should return a correct object if Subtraction operation is successfully called', () => {
    const { sut } = makeSut()
    const subtractionResult = sut.calculate('id', 'subtraction', 'left', 'right')
    expect(subtractionResult.id).toEqual(sut.id)
    expect(subtractionResult.result).toBeTruthy()
  })

  test('Should return a correct object if Multiplication operation is successfully called', () => {
    const { sut } = makeSut()
    const multiplicationResult = sut.calculate('id', 'multiplication', 'left', 'right')
    expect(multiplicationResult.id).toEqual(sut.id)
    expect(multiplicationResult.result).toBeTruthy()
  })

  test('Should return a correct object if Division operation is successfully called', () => {
    const { sut } = makeSut()
    const divisionResult = sut.calculate('id', 'division', 'left', 'right')
    expect(divisionResult.id).toEqual(sut.id)
    expect(divisionResult.result).toBeTruthy()
  })

  test('Should return a correct object if Remainder operation is successfully called', () => {
    const { sut } = makeSut()
    const remainderResult = sut.calculate('id', 'remainder', 'left', 'right')
    expect(remainderResult.id).toEqual(sut.id)
    expect(remainderResult.result).toBeTruthy()
  })

  test('Should throw if any dependency throws', () => {
    const additionUseCase = makeAdditionUseCase()
    const subtractionUseCase = makeSubtractionUseCase()
    const multiplicationUseCase = makeMultiplicationUseCase()
    const divisionUseCase = makeDivisionUseCase()

    const suts = [].concat(
      new MathUseCase({ additionUseCase: makeAdditionUseCaseWithError() }),
      new MathUseCase({ additionUseCase, subtractionUseCase: makeSubtractionUseCaseWithError() }),
      new MathUseCase({ additionUseCase, subtractionUseCase, multiplicationUseCase: makeMultiplicationUseCaseWithError() }),
      new MathUseCase({ additionUseCase, subtractionUseCase, multiplicationUseCase, divisionUseCase: makeDivisionUseCaseWithError() }),
      new MathUseCase({ additionUseCase, subtractionUseCase, multiplicationUseCase, divisionUseCase, remainderUseCase: makeRemainderUseCaseWithError() })
    )

    for (const sut of suts) {
      expect(sut.calculate).toThrow()
    }
  })
})
