import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  public loginForm: FormGroup;
  public save = false;
  public hideLogin = true;

  constructor(
    public fb: FormBuilder,
    public configService: ConfigurationService,
    public authService: AuthService,
    public storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(60)]],
      userName: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  public login(): Promise<void> {
    this.configService.loading = true;
    this.hideLogin = true;
    this.save = true;
    if (!this.loginForm.valid) {
      this.configService.loading = false;
      return;
    }
    return this.authService.login(this.loginForm.value.userName, this.loginForm.value.password).then(
      (data) => {
        if (data && data.length > 0) {
          this.storageService.setValue('token', data[0].token);
          return this.authService.roles().then(
            (roles) => {
              this.storageService.setValue('roles', roles[0].role);
              const roleName = this.storageService.settings.roles.find(role => role.key === data[0].role);
              this.storageService.setValue('user', { name: data[0].name, id: data[0].user_id, roleId: roleName.key, role: roleName.role });
              this.configService.loading = false;
              this.router.navigate(['']);
            });
        } else {
          this.configService.loading = false;
        }
      });
  }

  public forgotPass(): void {
    this.router.navigate(['/restore-password']);
  }

}
