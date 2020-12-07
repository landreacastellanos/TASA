export interface Products {
  color: string;
  commercial_name: string;
  concentration: string;
  dose_by_ha: number;
  formulator: string;
  id: number;
  ing_active: string;
  presentation: string;
  provider: string;
  segment: string;
}

export interface StageBetween {
  application_date: string;
  end_traking_date: string;
  observations: string;
  products: StageProduct[];
  start_traking_date: string;
}

export interface StageBetweenRequest extends StageBetween {
  // images uploaded previously
  images?: string[];
  land_id: number;
}

export interface StageBetweenResponse extends StageBetween {
  enabled: boolean;
}

export interface StageProduct {
  color: string;
  commercial_name: string;
  concentration: string;
  dose_by_ha: number;
  formulator: string;
  id: number;
  ing_active: string;
  presentation: string;
  provider: string;
  segment: string;
}

interface StageOne {
  real_date?: string;
  sowing_date?: string;
  type_sowing: string;
  variety: string;
}

export interface StageOneResponse extends StageOne {
  enabled: boolean;
}

export interface StageOneRequest extends StageOne {
  // images uploaded previously
  images?: string[];
  land_id: number;
}

// tslint:disable-next-line: max-line-length
/** Response array of string storage on server like `["1f035f78-2f80-11eb-a432-ded54758e1b2.jpg", "1f035f79-2f80-11eb-a432-ded54758e1b2.jpeg", "1f035f7a-2f80-11eb-a432-ded54758e1b2.jpg"]` */
export type UploadFileResponse = string[];
