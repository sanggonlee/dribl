import express from 'express';

export default abstract class Endpoint {
  protected route: express.Application;

  constructor(app: express.Application, path: string) {
    this.route = express();
    this.route.get('/', this.get.bind(this));
    this.route.post('/', this.post.bind(this));
    this.route.patch('/', this.update.bind(this));
    this.route.delete('/', this.delete.bind(this));

    app.use(path, this.route);
  }

  protected get(req: express.Request, res: express.Response): void {
    this.notImplemented(res);
  }

  protected post(req: express.Request, res: express.Response): void {
    this.notImplemented(res);
  }

  protected update(req: express.Request, res: express.Response): void {
    this.notImplemented(res);
  }

  protected delete(req: express.Request, res: express.Response): void {
    this.notImplemented(res);
  }

  private notImplemented(res: express.Response): void {
    res.status(405).send('Method not allowed');
  }
}
