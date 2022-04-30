import express from 'express';
import Endpoint from './Endpoint';
import SystemInfoEndpoint from './SystemInfoEndpoint';

export default class REST extends Endpoint {
  constructor(app: express.Application) {
    super(app, '/');

    new SystemInfoEndpoint(this.route);
  }
}
