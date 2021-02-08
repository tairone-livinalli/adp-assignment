const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class MultiplicationUseCase {
    multiply (left, right) {
      if (!left) {
        throw new MissingParamError('left')
      }
      if (!right) {
        throw new MissingParamError('right')
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

  test('Should throw if no right operator is provided', () => {
    const sut = makeSut()
    expect(() => sut.multiply('left')).toThrow(new MissingParamError('right'))
  })
})
