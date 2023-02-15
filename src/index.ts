import express from 'express';
import imageRoute from './routes/images'

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, () => {
  console.log(`server started and listening at localhost:${port}`);
});

app.use('/image', imageRoute);