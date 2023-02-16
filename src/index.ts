import express from 'express';
import imageRoute from './routes/images';
import { log } from './logger';

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, (): void => {
  console.log(`server started and listening at localhost:${port}`);
});

app.use(log);
app.use('/api', imageRoute);

export default app;
