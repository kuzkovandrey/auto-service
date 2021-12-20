export interface OrderForm {
  personId: string;
  partsId: string[];
  priceListId: string;
  cost?: number;
  client: {
    name: string;
    email: string;
  };
  car: {
    stateNumber: string;
    model: string;
    year: number;
  };
}
