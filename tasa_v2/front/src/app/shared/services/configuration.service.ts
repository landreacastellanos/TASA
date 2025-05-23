import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  public loading = false;
  public initialPage = true;
  public rolesMock =[
    {key: 1, color: 'red'},
    {key: 2, color: 'blue'},
    {key: 3, color: 'pink'},
    {key: 4, color: 'yellow'},
    {key: 5, color: 'brown'},
    {key: 6, color: 'black'},
    {key: 7, color: 'orange'},
    {key: 8, color: 'gray'},
    {key: 9, color: 'salmon'},
  ]

  constructor() {}

  public setLoadingPage(loading): void {
    this.loading = loading;
  }
  public mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public isMobile(): boolean {
    // tslint:disable-next-line: only-arrow-functions
    return (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      ) {
        return true;
      } else {
        return false;
      }
    })(navigator.userAgent || navigator.vendor);
  }

  get screen(): any {
    return window.innerWidth || document.body.clientWidth;
  }

  get screenHeight(): any {
    return window.innerHeight || document.body.clientHeight;
  }

  public disableForm(form: FormGroup, disable: boolean): void {
    const keys = Object.keys(form.value);
    keys.forEach((element) => {
      disable ? form.get(element).disable() : form.get(element).enable();
    });
  }

  public updateValues(from: object, target: object): void {
    const keys = Object.keys(from);
    keys.forEach((key) => {
      target[key] = from[key];
    });
  }

  timeRangeValidator(startControlName: string, endControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get(startControlName)?.value;
      const end = group.get(endControlName)?.value;
  
      if (start && end) {
        const startTime = this.parseTime(start);
        const endTime = this.parseTime(end);
  
        if (startTime && endTime && this.isTimeBefore(startTime, endTime)) {
          return { timeRangeInvalid: true };
        }
      }
  
      return null;
    };
  }
  
  parseTime(time: string): { hours: number, minutes: number } | null {
    const [hours, minutes] = time.split(':').map(Number);
    return isNaN(hours) || isNaN(minutes) ? null : { hours, minutes };
  }
  
  isTimeBefore(startTime: { hours: number, minutes: number }, endTime: { hours: number, minutes: number }): boolean {
    return (endTime.hours < startTime.hours) || (endTime.hours === startTime.hours && endTime.minutes < startTime.minutes);
  }
}
