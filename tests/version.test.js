import { jest } from '@jest/globals';
import request from 'supertest';
import { startServer } from '../app.js';

jest.setTimeout(10000); // 10 seconds
let server;
let sequelize;

beforeAll(async () => {
  const started = await startServer();
  server = started.server;
  sequelize = started.sequelize;
});

afterAll(async () => {
  if (server) {
    await new Promise(resolve => server.close(resolve));
  }
  if (sequelize) {
    await sequelize.close();
  }
});

describe('GET /version', () => {
  it('responds with current version', async () => {
    const response = await request(server).get('/version');
    expect(response.statusCode).toBe(200);
    expect(response.body.version).toBeDefined();
  });
});
