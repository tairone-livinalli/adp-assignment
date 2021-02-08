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

      return left + right
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

  test('Should add if called with positive numbers', () => {
    const sut = makeSut()
    const result = sut.add(2, 3)
    expect(result).toEqual(5)
  })

  test('Should add if called with large positive numbers', () => {
    const sut = makeSut()
    const result = sut.add(4023771758034621, 6786420380259905)
    expect(result).toEqual(10810192138294526)
  })

  test('Should add if called with negative left operator', () => {
    const sut = makeSut()
    const result = sut.add(-3937124165523131, 8138589928066581)
    expect(result).toEqual(4201465762543450)
  })
})
