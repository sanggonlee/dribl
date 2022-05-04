import express from 'express';
import Endpoint from './Endpoint';
import SystemManager from '../SystemManager';

export default class SystemInfoEndpoint extends Endpoint {
  constructor(app: express.Application) {
    super(app, '/system/info');
  }

  get(req: express.Request, res: express.Response): void {
    const systemInfo = SystemManager.instance().getSystemInfo();
    res.status(200).send(systemInfo);
  }
}
