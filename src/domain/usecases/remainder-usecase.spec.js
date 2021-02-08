const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class RemainderUseCase {
    rest (left, right) {
      if (!left) {
        throw new MissingParamError('left')
      }
      if (!right) {
        throw new MissingParamError('right')
      }
    }
  }

  return new RemainderUseCase()
}

describe('Remainder UseCase', () => {
  test('Should throw if no left operator is provided', () => {
    const sut = makeSut()
    expect(sut.rest).toThrow(new MissingParamError('left'))
  })

  test('Should throw if no right operator is provided', () => {
    const sut = makeSut()
    expect(() => sut.rest('left')).toThrow(new MissingParamError('right'))
  })
})
