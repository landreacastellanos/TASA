export interface Farm {
  business_name: string;
  id: number;
  name: string;
  type_planting: string;
}

export interface FarmById {
  business_name: string;
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
  sowing_system: number;
  web_page: string
  batchs: Batches[];
}

export interface Batches {
  hectares_number: number;
  id: number;
  name: string;
}
