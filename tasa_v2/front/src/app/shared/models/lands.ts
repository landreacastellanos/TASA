import { Batches, FarmById } from './farm';

export interface LandResponse
  extends Pick<FarmById, Exclude<keyof FarmById, 'batchs'>> {
  batchs: Batches[];
}
