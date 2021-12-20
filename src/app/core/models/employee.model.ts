import { DBEntityModel } from './db-entity.model';

export interface Employee extends DBEntityModel {
  name?: string;
  rate?: number;
}
