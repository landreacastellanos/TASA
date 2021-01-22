export interface StageHarvest {
  amount_quintals: number;
  amount_quintals_ha: number;
  harvest_date: string;
  observations: string;
}

export interface StageHarvestRequest extends StageHarvest {
  // images uploaded previously
  images?: string[];
  land_id: number;
  stage_number: number;
}

export interface StageHarvestResponse extends StageHarvest {
  enabled: boolean;
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
  stage_number: number;
}

export interface StageBetweenResponse extends StageBetween {
  enabled: boolean;
}

export class StageProduct {
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

  constructor() {
    this.color = '';
    this.commercial_name = '';
    this.concentration = '';
    this.dose_by_ha = undefined;
    this.formulator = '';
    this.id = undefined;
    this.ing_active = '';
    this.presentation = '';
    this.provider = '';
    this.segment = '';
  }
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
