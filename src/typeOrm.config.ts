import { DataSource, DataSourceOptions } from 'typeorm';
import {
  DB_NAME,
  HOSTNAME,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} from '../src/constants';

const typeormOprions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DOCKER_HOST || HOSTNAME,
  port: +process.env.POSTGRES_PORT || POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME || POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD || POSTGRES_PASSWORD,
  database: process.env.DB_NAME || DB_NAME,
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js', 'migrations/*.ts'],
  synchronize: true,
};

export default new DataSource(typeormOprions);
