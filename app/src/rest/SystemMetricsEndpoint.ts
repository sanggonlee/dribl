import express from 'express';
import Endpoint from './Endpoint';
import SystemManager from '../SystemManager';

export default class SystemMetricsEndpoint extends Endpoint {
  constructor(app: express.Application) {
    super(app, '/system/metrics');
  }

  post(req: express.Request, res: express.Response): void {
    console.log({ req });
    const interval = req.body.interval;
    SystemManager.instance().startSystemMetrics(interval);
    res.status(200).send({ status: 'Success' });
  }

  get(req: express.Request, res: express.Response): void {
    const systemMetrics = SystemManager.instance().getSystemMetrics();
    res.status(200).send(systemMetrics);
  }
}
