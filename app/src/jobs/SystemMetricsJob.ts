import { CronJob } from './Job';

export default class SystemMetricsJob implements CronJob {
  private _scheduler: NodeJS.Timer | undefined;
  private _isRunning: boolean = false;

  public start(interval: number): void {
    if (this._isRunning) {
      return;
    }

    this._isRunning = true;
    this._scheduler = setInterval(() => this.measureSystemMetrics(), interval);
  }

  public stop(): void {
    if (!this._scheduler) {
      return;
    }

    clearInterval(this._scheduler);
    this._isRunning = false;
  }

  public isRunning(): boolean {
    return this._isRunning;
  }

  private measureSystemMetrics(): void {
    // TODO: implement
  }
}
