import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPassword } from './confirm-password.validator';
import { FormGroup } from '@angular/forms';
import { Role } from '../../../../shared/models/role';
import { RoleService } from '../../../../shared/services/role.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public loginForm: FormGroup;
  public save = false;
  public hidePassword = true;
  public hideRepeadPassword = true;
  userFg: FormGroup;
  submitted = false;
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
      age: [''],
      profession: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
      role_id: [0, [Validators.required]]
    },{ validators:[confirmPassword] });
    console.log(this.userFg);

  }

  onSubmit() {
    const randNum = Math.floor(Math.random() * 1000);
    console.log(this.userFg);
    this.submitted = true;
    return this._userService.create({
      age: randNum,
      email: `juanse_${randNum}@yopmail.com`,
      last_name: `dussan_${randNum}`,
      name: `juanse_${randNum}`,
      password: `juanse_${randNum}@yopmail.com`,
      phone: randNum,
      profesion: `profesion_${randNum}`,
      role_id: 1,
    });
  }

  print(value) {
    console.debug(value)
  }

  get roles(): Promise<Role[]> {
    return this._roleService.allRolesPromise;
  }

  get controls(){
    return this.userFg.controls;
  }
}
