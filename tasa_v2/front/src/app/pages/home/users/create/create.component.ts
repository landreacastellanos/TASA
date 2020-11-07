import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPassword } from './confirm-password.validator';
import { FormGroup } from '@angular/forms';
import { Role } from '../../../../shared/models/role';
import { UserService } from '../user.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public loginForm: FormGroup;
  public save = false;
  public hidePassword = true;
  public hideRepeadPassword = true;
  public userFg: FormGroup;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userFg = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        phone: [undefined, [Validators.minLength(7)]],
        age: [undefined],
        profession: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordRepeat: ['', [Validators.required]],
        role_id: [undefined, [Validators.required]],
      },
      { validators: [confirmPassword] }
    );
    console.log(this.userFg);
  }

  onSubmit() {
    const randNum = Math.floor(Math.random() * 1000);
    console.log(this.userFg);
    this.submitted = true;
    if (!this.userFg.valid) {
      return this.validationError();
    }

    const {
      profession,
      passwordRepeat,
      lastName,
      ...userCreate
    } = this.userFg.value;
    return this.userService
      .create({
        profesion: profession,
        last_name: lastName,
        pancho: 'asdsd',
        ...userCreate,
      })
      .then((data) => {
        if (data === null) {
          return this.snackBar.open('Hubo un error', 'x', {
            duration: 2000,
            panelClass: ['snackbar-warn'],
          });
        }
        this.snackBar.open('Usuario creado', 'x', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
        this.goBack();
      });
  }

  validationError() {
    return this.snackBar.open('Rectifica los campos', 'x', {
      duration: 2000,
      panelClass: ['snackbar-warn'],
    });
  }

  goBack() {
    this.router.navigate(['/users/']);
  }

  get roles(): Role[] {
    return this.storageService.settings.roles;
  }

  get controls() {
    return this.userFg.controls;
  }
}
