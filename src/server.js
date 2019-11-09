import Express from 'express';
import bodyParser from 'body-parser';

import apiRoutes from './routes/api';

const PORT = process.env.PORT || 8080;
const app = Express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
})