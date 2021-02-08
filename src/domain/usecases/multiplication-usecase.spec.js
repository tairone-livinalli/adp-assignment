const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class MultiplicationUseCase {
    multiply (left) {
      if (!left) {
        throw new MissingParamError('left')
      }
    }
  }

  return new MultiplicationUseCase()
}

describe('Multiplication UseCase', () => {
  test('Should throw if no left operator is provided', () => {
    const sut = makeSut()
    expect(sut.multiply).toThrow(new MissingParamError('left'))
  })
})
