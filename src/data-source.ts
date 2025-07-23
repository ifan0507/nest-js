import { DataSource } from 'typeorm';
import config from '@/typeorm.config';

export const AppDataSource = new DataSource(config);
