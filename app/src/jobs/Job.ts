export interface CronJob {
  start(interval: number): void;
  stop(): void;
  isRunning(): boolean;
}
