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
