import express from 'express';
import { z } from 'zod';
import { resizeImage } from '../process/images/index';

const routes = express.Router();

routes.get('/resize',
  async (req, res) => {
    // validate
    const schema = z.object({ 
      filename: z.string().max(200),
      width: z.string().transform(Number),
      height: z.string().transform(Number),

    });
    const results = schema.safeParse(req.query);
    if (!results.success) {
      return res.json(results.error.issues[0]).sendStatus(400);
    }
    // process
    const thumbFilename = await resizeImage(results.data.filename, results.data.width, results.data.height);
    return res.status(200).sendFile(thumbFilename);
  });

export default routes;