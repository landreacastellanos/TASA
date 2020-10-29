import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  public loginForm: FormGroup;
  public loginError: false;
  public save: false;
  public hideLogin = true;

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  public login() {

  }

  public focusLogin() {

  }

  public forgotPass(){

  }

}
