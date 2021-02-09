import { Moment } from "moment";

export interface CalendarChildren {
  /** implement with true if the view child has save button */
  hasSave?: boolean;
  onSave?: () => any;
  title: string;
  /** text used in back button */
  textBack: string;
  onBack: () => any;
  /** load 3 photos */
  hasFilesButton?: boolean;
  onChangeFiles?: (files: FileList, picture?: string, listPictures?: string[]) => any;
  /** referencePhoto */
  hasReferencePhoto?: boolean;
  urlReferencePhoto?: string;
  referencePhotoSelected?: 'before' | 'after';
  onClickBeforeReferencePhoto?: () => any;
  onClickAfterReferencePhoto?: () => any;

  /** delete pictures */
  deletePicture?: (picture?: string) => any;

  /** date range segment */

  hasEndTrackingDate?: boolean;
  endTrackingDate?: Moment;

  hasStartTrackingDate?: boolean;
  startTrackingDate?: Moment;

  /** options for sponsors image */
  hasSponsorSpace?:boolean;
  textSponsorImage?:string;

  /** view pictures */
  pictures?: string[];
}
