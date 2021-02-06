// {
//   "id": "66df7d3d-8340-4efd-a528-b5204d02a864",
//   "operation": "multiplication",
//   "left": -3364257091338055,
//   "right": -6634491299249283
// }

class MathRouter {
  route (httpRequest) {
    if (!httpRequest.body.id) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Math Router', () => {
  test('should return 400 if no id is provided', () => {
    const sut = new MathRouter()
    const httpRequest = {
      body: {
        operation: 'multiplication',
        left: -3364257091338055,
        right: -6634491299249283
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
