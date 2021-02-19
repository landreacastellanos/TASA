import moment, { Moment } from 'moment';

export interface Activity {
  stage_name: string;
  stage_id: number;
  id_land: number;
  id_user: number;
  date: Moment;
  land_name: string;
  property_name: string;
  property_id: number;
}