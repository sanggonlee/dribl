import express from 'express';
import Endpoint from './Endpoint';
import SystemManager from '../SystemManager';

export default class SystemInfoEndpoint extends Endpoint {
  constructor(app: express.Application) {
    super(app, '/system/info');
  }

  async get(req: express.Request, res: express.Response): Promise<void> {
    const properties = ((req.query.properties ?? '') as string).split(',');
    const systemInfo = await SystemManager.instance().getSystemInfo(properties);
    res.status(200).send(systemInfo);
  }
}
