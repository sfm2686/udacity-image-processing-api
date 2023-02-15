import supertest from 'supertest';
import app from '../../src/index';
import fs from 'fs';
import path from 'path';

const request = supertest(app);
const THUMBS_DIR = 'assets/thumb';

describe('Test images endpoint', () => {
  it('returns 200 with valid arguments', async () => {
    const filename = 'fjord'
    const width = 200;
    const height = 200;
    const response = await request.get(`/api/images?filename=${filename}&width=${width}&height=${height}`);
    expect(response.status).toBe(200);
  });

  it('returns 400 with invalid argument/s', async () => {
    const filename = 'no-image'
    const width = 200;
    const height = 200;
    const response = await request.get(`/api/images?filename=${filename}&width=${width}&height=${height}`);
    expect(response.status).toBe(400);
  });

  it('does not reprocess images', async () => {
    const filename = 'fjord'
    const width = 200;
    const height = 200;
    let response = await request.get(`/api/images?filename=${filename}&width=${width}&height=${height}`);
    response = await request.get(`/api/images?filename=${filename}&width=${width}&height=${height}`);
    const files = fs.readdirSync(THUMBS_DIR);
    expect(files.length).toEqual(1);
    expect(response.status).toBe(200);
  });

  beforeAll(() => {
    const files = fs.readdirSync(THUMBS_DIR);
    files.forEach(file => {
      fs.unlinkSync(path.join(THUMBS_DIR, file));
    });
  });

  afterEach(() => {
    const files = fs.readdirSync(THUMBS_DIR);
    files.forEach(file => {
      fs.unlinkSync(path.join(THUMBS_DIR, file));
    });
  });
});