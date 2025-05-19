const request = require('supertest');
const app = require('../src/app')

describe('GET /api/weather', () => {
    it('повертає погоду для міста', async () => {
    const res = await request(app).get('/api/weather?city=Kyiv');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('temperature');
  });
});