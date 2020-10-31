import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  public restPasswordForm: FormGroup;
  public save = false;
  public hide = true;
  public hideConfirm = true;
  public token = '';
  public user = ''

  constructor(
    public fb: FormBuilder,
    public configService: ConfigurationService,
    public authService: AuthService,
    public storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.restPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(60)]],
      passwordConfirm: ['', [Validators.required, Validators.maxLength(60)]],
    }, {
      validator: this.configService.mustMatch('password', 'passwordConfirm'),
    });

    const token = this.route.snapshot.queryParamMap.get('token');
    const mail = this.route.snapshot.queryParamMap.get('mail');
    if (token && mail) {
      this.token = token;
      this.user = mail;
      this.storageService.setValue('token', token);
    } else {
      this.router.navigate(['/login']);
      this.snackBar.open('Token invalido', 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn']
      });
    }
  }

  public resetPassword(): Promise<void> {
    this.configService.loading = true;
    this.save = true;
    if (!this.restPasswordForm.valid) {
      this.configService.loading = false;
      return;
    }
    return this.authService.resetPassword(this.user, this.restPasswordForm.value.password).then(
      (data) => {
        if (data) {
          this.snackBar.open('Contraseña restaurada', 'x', {
            duration: 2000,
            panelClass: ['snackbar-success']
          });
        }
        this.configService.loading = false;
        this.router.navigate(['/login']);
      });
  }

}
