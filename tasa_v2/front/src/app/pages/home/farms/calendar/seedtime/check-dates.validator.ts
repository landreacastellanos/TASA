import { FormGroup } from '@angular/forms';

export const checkDates = (form: FormGroup) => {
  const sowing_date = form?.controls?.sowing_date?.value;
  const real_date = form?.controls?.real_date?.value;
  if (!!real_date && !sowing_date) {
    return { invalidCheckDates: true };
  }
  return null;
};
