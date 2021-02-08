const { MissingParamError } = require('../../utils/errors')

class MathUseCase {
  calculate (id, operation, left) {
    if (!id) {
      throw new MissingParamError('id')
    }
    if (!operation) {
      throw new MissingParamError('operation')
    }
    if (!left) {
      throw new MissingParamError('left')
    }
  }
}

describe('Math UseCase', () => {
  test('Should throw if no id is provided', () => {
    const sut = new MathUseCase()
    expect(sut.calculate).toThrow(new MissingParamError('id'))
  })

  test('Should throw if no operation is provided', () => {
    const sut = new MathUseCase()
    expect(() => sut.calculate('id')).toThrow(new MissingParamError('operation'))
  })

  test('Should throw if no left operator is provided', () => {
    const sut = new MathUseCase()
    expect(() => sut.calculate('id', 'operation')).toThrow(new MissingParamError('left'))
  })
})
