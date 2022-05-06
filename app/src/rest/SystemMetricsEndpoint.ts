import express from 'express';
import Endpoint from './Endpoint';
import SystemManager from '../SystemManager';

export default class SystemMetricsEndpoint extends Endpoint {
  constructor(app: express.Application) {
    super(app, '/system/metrics');
  }

  post(req: express.Request, res: express.Response): void {
    const interval = req.body.interval;
    SystemManager.instance().startSystemMetrics(interval);
    res.status(200).send({ status: 'Success' });
  }

  async get(req: express.Request, res: express.Response): Promise<void> {
    const systemMetrics = await SystemManager.instance().getSystemMetrics();
    res.status(200).send(systemMetrics);
  }
}
