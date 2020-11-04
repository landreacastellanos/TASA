import { OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPassword } from './confirm-password.validator';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';



interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public loginForm: FormGroup;
  public save = false;
  public hideLogin = true;

  food: Food[] = [
    { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }]
  userFg: FormGroup;
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.userFg = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.minLength(7)]],
      age: ['', [Validators.max(99), Validators.min(18)]],
      profession: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(8), confirmPassword]],


    });
  }

  onSubmit() {
    console.log({ form: this.userFg });

  }

  print(value) {
    console.debug(value)
  }

}
