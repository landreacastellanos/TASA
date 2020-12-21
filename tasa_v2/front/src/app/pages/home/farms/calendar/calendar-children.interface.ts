import { Moment } from "moment";

export interface CalendarChildren {
  /** implement with true if the view child has save button */
  hasSave?: boolean;
  onSave?: () => any;
  /** text used in back button */
  textBack: string;
  onBack: () => any;
  /** load 3 photos */
  hasFilesButton?: boolean;
  onChangeFiles?: (files: FileList) => any;
  /** referencePhoto */
  hasReferencePhoto?: boolean;
  urlReferencePhoto?: string;
  referencePhotoSelected?: 'before' | 'after';
  onClickBeforeReferencePhoto?: () => any;
  onClickAfterReferencePhoto?: () => any;
  /** date range segment */

  hasEndTrackingDate?: boolean;
  endTrackingDate?: Moment;

  hasStartTrackingDate?: boolean;
  startTrackingDate?: Moment;

  hasEndHarvestDate?:boolean;
  endHarvestDate?: Moment;

  /** options for sponsors image */
  hasSponsorSpace?:boolean;
  textSponsorImage?:string;
}
