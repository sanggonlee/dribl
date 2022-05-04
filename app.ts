import express from 'express';
import bodyparser from 'body-parser';
import REST from './app/src/rest/REST';
import ConfigManager from './app/src/ConfigManager';
import SystemManager from './app/src/SystemManager';

ConfigManager.init('./app/configs');
SystemManager.init();

const app = express();
app.use(bodyparser.json());
new REST(app);

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
