const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class AdditionUseCase {
    add (left, right) {
      if (!left) {
        throw new MissingParamError('left')
      }
      if (!right) {
        throw new MissingParamError('right')
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

  test('Should throw if no right operator is provided', () => {
    const sut = makeSut()
    expect(() => sut.add('left')).toThrow(new MissingParamError('right'))
  })
})
