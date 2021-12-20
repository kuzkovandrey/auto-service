import { DBEntityModel } from './db-entity.model';

export interface OrderModel extends DBEntityModel {
  maintenanceId: string;
  clientId: string;
  personId: string;
  date: string;
  cost: number;
}
