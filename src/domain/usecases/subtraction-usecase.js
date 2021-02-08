const { MissingParamError } = require('../../utils/errors')

module.exports = class SubtractionUseCase {
  sub (left, right) {
    if (!left) {
      throw new MissingParamError('left')
    }
    if (!right) {
      throw new MissingParamError('right')
    }

    return left - right
  }
}
