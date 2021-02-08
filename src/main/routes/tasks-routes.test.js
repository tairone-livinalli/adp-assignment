const request = require('supertest')
const app = require('../config/app')

describe('Math Routes', () => {
  test('Should return 200 when valid task is provided', async () => {
    const id = '66df7d3d-8340-4efd-a528-b5204d02a864'

    await request(app)
      .post('/api/tasks')
      .send({
        id,
        operation: 'multiplication',
        left: -3364257091338055,
        right: -6634491299249283
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.id).toEqual(id)
        expect(body.result).toEqual(2.232013440092003e+31)
      })
  })

  test('Should return 400 when invalid task is provided', async () => {
    const id = '66df7d3d-8340-4efd-a528-b5204d02a864'

    await request(app)
      .post('/api/tasks')
      .send({
        id,
        left: -3364257091338055,
        right: -6634491299249283
      })
      .expect(400)
  })
})
