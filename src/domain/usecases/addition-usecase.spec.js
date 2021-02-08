const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class AdditionUseCase {
    add (left) {
      if (!left) {
        throw new MissingParamError('left')
      }
    }
  }

  return new AdditionUseCase()
}

describe('Addition UseCase', () => {
  test('Should throw if no left operator is provided', () => {
    const sut = makeSut()
    expect(sut.add).toThrow(new MissingParamError('left'))
  })
})
