const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class SubtractionUseCase {
    sub (left) {
      if (!left) {
        throw new MissingParamError('left')
      }
    }
  }

  return new SubtractionUseCase()
}

describe('Subtraction UseCase', () => {
  test('Should throw if no left operator is provided', () => {
    const sut = makeSut()
    expect(sut.sub).toThrow(new MissingParamError('left'))
  })
})
