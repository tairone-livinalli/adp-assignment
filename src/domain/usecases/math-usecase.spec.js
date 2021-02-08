const { MissingParamError } = require('../../utils/errors')

class MathUseCase {
  calculate (id) {
    if (!id) {
      throw new MissingParamError('id')
    }
  }
}

describe('Math UseCase', () => {
  test('Should throw if no id is provided', () => {
    const sut = new MathUseCase()
    expect(sut.calculate).toThrow(new MissingParamError('id'))
  })
})
