const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class RemainderUseCase {
    rest (left) {
      if (!left) {
        throw new MissingParamError('left')
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
})
