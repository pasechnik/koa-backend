import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { config } from '../config';
const parentDir = join(__dirname, '..');

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  url: config.db.databaseUrl,
  entities: [`${parentDir}/model/entity/**/*{.ts,.js}`],
  migrations: [`${parentDir}/model/migration/**/*{.ts,.js}`],
  subscribers: [`${parentDir}/model/subscriber/**/*{.ts,.js}`],
  cli: {
    entitiesDir: `${parentDir}/model/entity`,
    migrationsDir: `${parentDir}/model/migration`,
    subscribersDir: `${parentDir}/model/subscriber`
  },
  ssl: config.db.sslConn, // if not development, will use SSL
  extra: config.db.sslConn
    ? {
        ssl: {
          rejectUnauthorized: false // Heroku uses self signed certificates
        }
      }
    : {},
  synchronize: true,
  logging: !config.isProduction
};

interface IDatabase {
  connect(): Promise<Connection>;
  disconnect(): Promise<void>;
  executeSQL(sql: string, ...params: any[]): Promise<any>;
  reset(): any;
}

export class Database implements IDatabase {
  private connection: Connection;

  public async connect(): Promise<Connection> {
    if (this.connection) {
      await this.connection.connect();
      return this.connection;
    }
    this.connection = await createConnection(connectionOpts);
    return this.connection;
  }

  public async disconnect(): Promise<void> {
    if (this.connection.isConnected) {
      await this.connection.close();
    }
  }

  public async executeSQL(sql: string, ...params: any[]): Promise<any> {
    return this.connection.createQueryRunner().query(sql, params);
  }

  public async reset() {
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
  }

  public async runMigrations() {
    await this.connection.runMigrations();
  }

  public async dropDatabase() {
    await this.connection.dropDatabase();
  }
}
