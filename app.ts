import express from 'express';
import REST from './app/src/rest/REST';
import ConfigManager from './app/src/ConfigManager';
import SystemInfoManager from './app/src/SystemInfoManager';

ConfigManager.init('./app/configs');
SystemInfoManager.init();

const app = express();
new REST(app);

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
