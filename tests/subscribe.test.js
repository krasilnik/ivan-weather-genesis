const request = require('supertest');
const app = require('../src/app');

describe('POST /api/subscribe', () => {
  it('створює підписку з валідними даними', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .send({
        email: `test${Date.now()}@example.com`,
        city: 'Kyiv',
        frequency: 'hourly',
      });

    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Confirmation email sent/i);
  });
});