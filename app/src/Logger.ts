import express from 'express';

// Simple and stupid logger.
// TODO: Improve
export default class Logger {
  static info(message: string, args?: Record<string, unknown>): void {
    console.log({ severity: 'info', message, args });
  }

  static error(message: string, args?: Record<string, unknown>): void {
    console.error({ serverity: 'error', message, args });
  }

  static logRequestMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const requestInfo = {
      time: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    };
    res.on('finish', () => {
      Logger.info('Request complet', requestInfo);
    });

    next();
  }
}
