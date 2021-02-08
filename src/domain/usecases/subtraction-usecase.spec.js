const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class SubtractionUseCase {
    sub (left, right) {
      if (!left) {
        throw new MissingParamError('left')
      }
      if (!right) {
        throw new MissingParamError('right')
      }

      return left - right
    }
  }

  return new SubtractionUseCase()
}

describe('Subtraction UseCase', () => {
  test('Should throw if no left operator is provided', () => {
    const sut = makeSut()
    expect(sut.sub).toThrow(new MissingParamError('left'))
  })

  test('Should throw if no right operator is provided', () => {
    const sut = makeSut()
    expect(() => sut.sub('left')).toThrow(new MissingParamError('right'))
  })

  test('Should sub with two positive numbers', () => {
    const sut = makeSut()
    const result = sut.sub(5, 3)
    expect(result).toEqual(2)
  })

  test('Should sub with negative left operator', () => {
    const sut = makeSut()
    const result = sut.sub(-1104576416323731, 2544567524349817)
    expect(result).toEqual(-3649143940673548)
  })

  test('Should sub with negative right operator', () => {
    const sut = makeSut()
    const result = sut.sub(7545560836307161, -8376690551836207)
    expect(result).toEqual(15922251388143368)
  })
})
