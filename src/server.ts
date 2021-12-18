// import { config } from './common/config';
import app from './app';

// ! Add PORT from config
app.listen(4000, () => {
  console.log(`App is running on http://localhost: 4000`);
});
