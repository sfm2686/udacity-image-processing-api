import express from 'express';
import { z } from 'zod';
import { resizeImageJpg } from '../process/images/index';

const routes = express.Router();

routes.get('/images', async (req, res) => {
  // validate
  const schema = z.object({
    filename: z.string().max(200),
    width: z.string().transform(Number),
    height: z.string().transform(Number)
  });
  const results = schema.safeParse(req.query);
  if (!results.success) {
    return res.status(400).send(results.error.issues[0]);
  }
  if (isNaN(results.data.width) || isNaN(results.data.height)) {
    return res.status(400).send({ error: 'invalid width or height' });
  }
  const { width, height } = results.data;
  if (width < 0 || width > 10000) {
    return res.status(400).send({ error: 'invalid width' });
  }
  if (height < 0 || height > 10000) {
    return res.status(400).send({ error: 'invalid height' });
  }
  // process
  const thumbFilename = await resizeImageJpg(
    results.data.filename,
    width,
    height
  );
  if (!thumbFilename) {
    return res.status(400).send({
      error: `Could not find requested image: '${results.data.filename}'`
    });
  }
  return res.status(200).sendFile(thumbFilename);
});

export default routes;
