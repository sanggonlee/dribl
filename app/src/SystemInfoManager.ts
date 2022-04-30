import os from 'os';
import ConfigManager, { SystemInfoConfigs } from './ConfigManager';

export type SystemInfo = {
  arch?: string;
  platform?: string;
  numCPUs?: number;
  totalMem?: number;
  freeMem?: number;
  uptime?: number;
};

export default class SystemInfoManager {
  public static init(): void {
    this.INSTANCE = new SystemInfoManager();
  }
  public static instance(): SystemInfoManager {
    return this.INSTANCE;
  }

  private static INSTANCE: SystemInfoManager;

  public getSystemInfo(): SystemInfo {
    const systemInfoConfigs =
      ConfigManager.instance().getConfigs<SystemInfoConfigs>('systeminfo');
    return this.computeSystemInfo(systemInfoConfigs.properties);
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
        case 'totalMem':
          systemInfo[property] = os.totalmem();
          break;
        case 'freeMem':
          systemInfo[property] = os.freemem();
          break;
        case 'uptime':
          systemInfo[property] = os.uptime();
          break;
      }
    });
    return systemInfo;
  }
}
