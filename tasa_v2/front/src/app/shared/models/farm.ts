export interface Farm {
  business_name: string;
  id: number;
  name: string;
  type_planting: string;
}

export interface FarmById {
  business_name: string;
  created_date?: string;
  decision_influencer: number;
  direction: string;
  hectares_total: number;
  id: number;
  manager: number;
  name: string;
  parthner_add: number;
  pay_manager: number;
  phone: number;
  property_owner: number;
  purchasing_manager: number;
  responsible_purchasing: number;
  seller: number;
  sowing_system: Arroz['id'];
  web_page: string;
  batchs: Batches[];
}

export interface Batches {
  hectares_number: number;
  id: number;
  name: string;
}

export interface IArrozType {
  readonly id: number;
  readonly name: string;
}
export class ArrozSecano implements IArrozType {
  readonly id = 3;
  readonly name = 'Arroz Secano';
}
export class ArrozDeRiego implements IArrozType {
  readonly id = 4;
  readonly name = 'Arroz de Riego';
}

export type Arroz = ArrozDeRiego | ArrozSecano | IArrozType;
