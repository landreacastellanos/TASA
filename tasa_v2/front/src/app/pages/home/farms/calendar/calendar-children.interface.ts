export interface CalendarChildren {
  /** implement with true if the view child has save button */
  hasSave?: boolean;
  onSave?: () => any;
  /** text used in back button */
  textBack: string;
  onBack: () => any;
  /**  */
  hasFilesButton?: boolean;
  onChangeFiles?: (files: FileList) => any;
}
