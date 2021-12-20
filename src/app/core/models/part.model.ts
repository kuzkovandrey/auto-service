import { DBEntityModel } from './db-entity.model';

export interface Part extends DBEntityModel {
  name: string;
  cost: number;
}
