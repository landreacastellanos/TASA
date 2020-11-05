import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPassword } from './confirm-password.validator';
import { FormGroup } from '@angular/forms';
import { Role } from '../../../../shared/models/role';
import { RoleService } from '../../../../shared/services/role.service';
import { UserService } from '../user.service';



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
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {

  public loginForm: FormGroup;
  public save = false;
  public hideLogin = true;

  food: Food[] = [
    { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }, { value: '2', viewValue: '3' }]
  userFg: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _roleService: RoleService
    ) { }


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
    const randNum = Math.floor(Math.random() * 1000);
    return this._userService.create({
      age: randNum,
      email: `juanse_${randNum}@yopmail.com`,
      last_name: `dussan_${randNum}`,
      name: `juanse_${randNum}`,
      password: `juanse_${randNum}@yopmail.com`,
      phone: randNum,
      profesion: `profesion_${randNum}`,
      role_id: 6,
    });
  }

  print(value) {
    console.debug(value)
  }

  get roles(): Promise<Role[]> {
    return this._roleService.allRolesPromise;
  }
}
