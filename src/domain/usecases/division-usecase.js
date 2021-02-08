const { MissingParamError } = require('../../utils/errors')

module.exports = class DivisionUseCase {
  divide (left, right) {
    if (!left) {
      throw new MissingParamError('left')
    }
    if (!right) {
      throw new MissingParamError('right')
    }

    return left / right
  }
}
