// import { PORT } from './common/config';
import app from './app';

app.listen(4000, () =>
  app.log.info(`App is running on http://localhost: 4000`)
)
