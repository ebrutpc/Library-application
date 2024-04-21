import DatabaseConfig from '../../config/database.config.json';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const Postgres_Instance = new DataSource({
  type: 'postgres',
  host: DatabaseConfig.host,
  port: DatabaseConfig.port,
  username: DatabaseConfig.username,
  password: DatabaseConfig.password,
  database: DatabaseConfig.database,
  synchronize: DatabaseConfig.synchronize,
  logging: DatabaseConfig.logging,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  subscribers: [],
  migrations: [],
});

export default Postgres_Instance;
