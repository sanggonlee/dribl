import express from 'express';
import Endpoint from './Endpoint';
import SystemInfoEndpoint from './SystemInfoEndpoint';
import SystemMetricsEndpoint from './SystemMetricsEndpoint';

export default class REST extends Endpoint {
  constructor(app: express.Application) {
    super(app, '/');

    new SystemInfoEndpoint(this.route);
    new SystemMetricsEndpoint(this.route);
  }
}
