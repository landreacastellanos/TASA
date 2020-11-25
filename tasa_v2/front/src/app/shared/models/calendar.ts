export interface StageOneResponse extends StageOneRequest{
  enabled: boolean;
}

export interface StageOneRequest {
  real_date: string;
  sowing_date: string;
  type_sowing: string;
  variety: string;
}