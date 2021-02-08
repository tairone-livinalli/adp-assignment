class MathUseCase {
  calculate (id) {
    if (!id) {
      throw new Error()
    }
  }
}

describe('Math UseCase', () => {
  test('Should throw if no id is provided', () => {
    const sut = new MathUseCase()
    expect(sut.calculate).toThrow()
  })
})
