import fs from 'fs';
import path from 'path';
import { resizeImageJpg } from '../../../src/process/images';

const THUMBS_DIR = 'assets/thumb';

describe('Test images processing', () => {
  it('processes images and names them correctly in thumbs folder', async () => {
    const name = await resizeImageJpg('fjord', 400, 400);
    const files = fs.readdirSync(THUMBS_DIR);
    expect(files.length).toEqual(1);
    expect(files[0]).toBe(path.parse(name).name + '.jpg');
  });

  it('does not processes images twice', async () => {
    let name = await resizeImageJpg('fjord', 400, 400);
    name = await resizeImageJpg('fjord', 400, 400);
    const files = fs.readdirSync(THUMBS_DIR);
    expect(files.length).toEqual(1);
    expect(files[0]).toBe(path.parse(name).name + '.jpg');
  });

  it('handles incorrect image names', async () => {
    let name = await resizeImageJpg('no-image', 400, 400);
    const files = fs.readdirSync(THUMBS_DIR);
    expect(files.length).toEqual(0);
    expect(name).toBe('');
  });

  afterEach(() => {
    const files = fs.readdirSync(THUMBS_DIR);
    files.forEach(file => {
      fs.unlinkSync(path.join(THUMBS_DIR, file));
    });
  });
});