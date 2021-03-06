const { MissingParamError } = require('../../utils/errors')
const RemainderUseCase = require('./remainder-usecase')

const makeSut = () => {
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

  test('Should get the rest of two positive numbers', () => {
    const sut = makeSut()
    const result = sut.rest(7420122351257453, 8773915326797283)
    expect(result).toEqual(7420122351257453)
  })

  test('Should get the rest with negative left operator', () => {
    const sut = makeSut()
    const result = sut.rest(-8773915326797283, 7420122351257453)
    expect(result).toEqual(-1353792975539830)
  })

  test('Should get the rest with negative right operator', () => {
    const sut = makeSut()
    const result = sut.rest(8773915326797283, -7420122351257453)
    expect(result).toEqual(1353792975539830)
  })

  test('Should get the rest of two negative numbers', () => {
    const sut = makeSut()
    const result = sut.rest(-8773915326797283, -7420122351257453)
    expect(result).toEqual(-1353792975539830)
  })
})
