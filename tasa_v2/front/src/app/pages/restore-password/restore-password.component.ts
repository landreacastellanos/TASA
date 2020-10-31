import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  public restorePasswordForm: FormGroup;
  public save = false;

  constructor(
    public fb: FormBuilder,
    public configService: ConfigurationService,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.restorePasswordForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  public restorePassword(): Promise<void> {
    this.configService.loading = true;
    this.save = true;
    if (!this.restorePasswordForm.valid) {
      this.configService.loading = false;
      return;
    }
    return this.authService.restorePassword(this.restorePasswordForm.value.userName).then(
      (data) => {
        if (data) {
          this.snackBar.open('Te hemos enviado un correo', 'x', {
            duration: 2000,
            panelClass: ['snackbar-success']
          });
        }
        this.configService.loading = false;
        this.router.navigate(['/login']);
      });
  }

}
