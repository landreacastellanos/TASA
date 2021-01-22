import { StageOneRequest, StageBetweenRequest, StageHarvestRequest } from './calendar';

export interface Historical {
  title: string;
  id: number;
}

export interface HistoricalDetail {
  title: string;
  id: number;
  owner: { name: string; id: number };
  seller: { name: string; id: number };
  segments: Segments[];
}

type Segments = StageOneRequest | StageBetweenRequest | StageHarvestRequest;
