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
