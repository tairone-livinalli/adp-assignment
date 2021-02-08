const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class DivisionUseCase {
    divide (left, right) {
      if (!left) {
        throw new MissingParamError('left')
      }
      if (!right) {
        throw new MissingParamError('right')
      }

      return left / right
    }
  }

  return new DivisionUseCase()
}

describe('Division UseCase', () => {
  test('Should throws if no left operator is provided', () => {
    const sut = makeSut()
    expect(sut.divide).toThrow(new MissingParamError('left'))
  })

  test('Should throws if no right operator is provided', () => {
    const sut = makeSut()
    expect(() => sut.divide('left')).toThrow(new MissingParamError('right'))
  })

  test('Should divide two positive numbers', () => {
    const sut = makeSut()
    const result = sut.divide(10, 5)
    expect(result).toEqual(2)
  })

  test('Should divide with negative left operator', () => {
    const sut = makeSut()
    const result = sut.divide(-4779009923225521, 5458112861418737)
    expect(result).toEqual(-0.8755791689480207)
  })

  test('Should divide with negative right operator', () => {
    const sut = makeSut()
    const result = sut.divide(4779009923225521, -5458112861418737)
    expect(result).toEqual(-0.8755791689480207)
  })
})
