import app from './app';
import { config } from './common/config';
// import { logger } from './logs';

app.listen(config.PORT, "0.0.0.0", () => {
  // logger.info(`App is running on http://localhost: ${config.PORT}`);
  console.log(`App is running on http://localhost: ${config.PORT}`);
});
