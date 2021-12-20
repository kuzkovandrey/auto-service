import { DBEntityModel } from './db-entity.model';

export interface Price extends DBEntityModel {
  description: string;
  cost: number;
}
