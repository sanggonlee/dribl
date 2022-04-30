import express from 'express';
import Endpoint from './Endpoint';
import SystemInfoManager from '../SystemInfoManager';

export default class SystemInfoEndpoint extends Endpoint {
  constructor(app: express.Application) {
    super(app, '/systeminfo');
  }

  get(req: express.Request, res: express.Response): void {
    const systemInfo = SystemInfoManager.instance().getSystemInfo();
    res.status(200).send(systemInfo);
  }
}
