import fs from 'fs';
import { join } from 'path';
import YAML from 'yaml';

export type SystemInfoConfigs = {
  properties: string[];
};

export default class ConfigManager {
  public static init(configDir: string): void {
    this.INSTANCE = new ConfigManager(configDir);
  }
  public static instance(): ConfigManager {
    return this.INSTANCE;
  }

  private static INSTANCE: ConfigManager;

  constructor(private configDir: string) {
    this.copyDefaultConfigs();
  }

  public getConfigs<T>(name: string): T {
    return YAML.parse(
      fs.readFileSync(join(this.getConfigStoreDir(), `${name}.yml`)).toString()
    );
  }

  private copyDefaultConfigs(): void {
    const defaultDir = join(this.configDir, 'default');
    fs.readdirSync(defaultDir).forEach((file) => {
      fs.copyFileSync(
        join(defaultDir, file),
        join(this.getConfigStoreDir(), file)
      );
    });
  }

  private getConfigStoreDir(): string {
    return join(this.configDir, 'store');
  }
}
