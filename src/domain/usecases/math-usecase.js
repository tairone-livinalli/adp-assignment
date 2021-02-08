const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class MathUseCase {
  constructor ({ additionUseCase, subtractionUseCase, multiplicationUseCase, divisionUseCase, remainderUseCase }) {
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

    this.id = id
    this.left = left
    this.right = right

    const result = this[operation]()

    return { id, result }
  }

  addition () {
    return this.additionUseCase.add(this.left, this.right)
  }

  subtraction () {
    return this.subtractionUseCase.sub(this.left, this.right)
  }

  multiplication () {
    return this.multiplicationUseCase.multiply(this.left, this.right)
  }

  division () {
    return this.divisionUseCase.divide(this.left, this.right)
  }

  remainder () {
    return this.remainderUseCase.rest(this.left, this.right)
  }

  isOperationValid (operation) {
    return this.validOperations.includes(operation)
  }
}
