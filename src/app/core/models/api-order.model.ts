export interface ApiOrder {
  cost: number;
  client: {
    name: string;
    email: string;
  };
  car: {
    stateNumber: string;
    model: string;
    year: number;
  };
  date?: Date;
  orderId?: string;
  personId: string;
}
