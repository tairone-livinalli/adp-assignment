const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class DivisionUseCase {
    divide (left) {
      if (!left) {
        throw new MissingParamError('left')
      }
    }
  }

  return new DivisionUseCase()
}

describe('Division UseCase', () => {
  test('Should throw if no left operator is provided', () => {
    const sut = makeSut()
    expect(sut.divide).toThrow(new MissingParamError('left'))
  })
})
