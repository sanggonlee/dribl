import express from 'express';
import Logger from '../Logger';
import Endpoint from './Endpoint';
import SystemInfoEndpoint from './SystemInfoEndpoint';
import SystemMetricsEndpoint from './SystemMetricsEndpoint';

export default class Routes extends Endpoint {
  constructor(app: express.Application) {
    super(app, '/api', Logger.logRequestMiddleware);

    new SystemInfoEndpoint(this.route);
    new SystemMetricsEndpoint(this.route);
  }
}
