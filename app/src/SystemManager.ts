import os from 'os';
import ConfigManager, { SystemInfoConfigs } from './ConfigManager';
import SystemMetricsJob from './jobs/SystemMetricsJob';

export type SystemInfo = {
  arch?: string;
  platform?: string;
  numCPUs?: number;
};

export type SystemMetrics = {
  totalMem?: number;
  freeMem?: number;
  uptime?: number;
};

export default class SystemManager {
  public static init(): void {
    this.INSTANCE = new SystemManager();
  }
  public static instance(): SystemManager {
    return this.INSTANCE;
  }

  constructor() {
    this.systemMetricsJob = new SystemMetricsJob();
  }

  private static INSTANCE: SystemManager;
  private systemMetricsJob: SystemMetricsJob;

  public getSystemInfo(): SystemInfo {
    const systemInfoConfigs =
      ConfigManager.instance().getConfigs<SystemInfoConfigs>('system_info');
    return this.computeSystemInfo(systemInfoConfigs.properties);
  }

  public getSystemMetrics(): SystemMetrics {
    const systemMetricsConfigs =
      ConfigManager.instance().getConfigs<SystemInfoConfigs>('system_metrics');
    return this.computeSystemMetrics(systemMetricsConfigs.properties);
  }

  public startSystemMetrics(interval: number): void {
    this.systemMetricsJob.start(interval);
  }

  private computeSystemInfo(properties: string[]): SystemInfo {
    const systemInfo: SystemInfo = {};
    properties.forEach((property) => {
      switch (property) {
        case 'arch':
          systemInfo[property] = os.arch();
          break;
        case 'platform':
          systemInfo[property] = os.platform().toString();
          break;
        case 'numCPUs':
          systemInfo[property] = os.cpus().length;
          break;
      }
    });
    return systemInfo;
  }

  private computeSystemMetrics(properties: string[]): SystemMetrics {
    const systemMetrics: SystemMetrics = {};
    properties.forEach((property) => {
      switch (property) {
        case 'totalMem':
          systemMetrics[property] = os.totalmem();
          break;
        case 'freeMem':
          systemMetrics[property] = os.freemem();
          break;
        case 'uptime':
          systemMetrics[property] = os.uptime();
          break;
      }
    });
    return systemMetrics;
  }
}
