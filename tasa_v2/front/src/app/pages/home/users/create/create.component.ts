import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPassword } from './confirm-password.validator';
import { FormGroup } from '@angular/forms';
import { Role } from '../../../../shared/models/role';
import { UserService } from '../user.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../shared/models/user';
import { UserCreate } from '../../../../shared/models/user-create';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public hidePassword = true;
  public hideRepeadPassword = true;
  public userFg: FormGroup;
  public submitted = false;
  id: string;
  mode: 'edit' | undefined;
  title = 'Crear usuario';

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.mode = this.route.snapshot.data.mode;
    if (this.mode === 'edit') {
      this.initEdit();
    }
  }

  async initEdit() {
    this.title = 'Editar usuario';
    this.id = this.route.snapshot.paramMap.get('id');
    const user = await this.userService.getUsersById(this.id);
    this.userFg = this.fb.group({
      name: [user.name, [Validators.required, Validators.minLength(3)]],
      lastName: [
        user.last_name,
        [Validators.required, Validators.minLength(3)],
      ],
      phone: [user.phone, [Validators.minLength(7)]],
      age: [user.age],
      profession: [user.profesion],
      email: [user.email, [Validators.required, Validators.email]],
      password: ['', []],
      // passwordRepeat: ['', []],
      role_id: [user.role_id, [Validators.required]],
    });
  }

  onSubmit() {
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

    const userSeralized = {
      profesion: profession,
      last_name: lastName,
      pancho: 'asdsd',
      ...userCreate,
    };
    if (this.mode === 'edit') {
      userSeralized.id = parseInt(this.id);
      if (!userSeralized.password) {
        delete userSeralized.password;
      }
    }

    const promise =
      this.mode === 'edit'
        ? this.userService.edit(userSeralized)
        : this.userService.create(userSeralized);

    const successMessage =
      this.mode === 'edit' ? 'Usuario editado' : 'Usuario creado';

    return promise.then((data) => {
      if (data === null) {
        return this.snackBar.open('Hubo un error', 'x', {
          duration: 2000,
          panelClass: ['snackbar-warn'],
        });
      }
      this.snackBar.open(successMessage, 'x', {
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
