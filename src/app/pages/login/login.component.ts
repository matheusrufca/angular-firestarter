import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NotifyService } from 'src/app/core/notify.service';
import { EmailValidation, MustMatch, PasswordValidation } from 'src/app/core/validators/validators';
import { SignUpModel } from './../../interfaces/Login.d';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpFormForm';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  loginForm: LoginForm;
  signUpForm: SignUpForm;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotifyService
  ) {
    this.loadViewForms();
  }

  ngOnInit() { }

  async login(): Promise<void> {
    if (!this.loginForm.valid) return;
    const credentials = this.loginForm.value;
    await this.signInWithEmail(credentials.email, credentials.password);
  }

  async signUp(): Promise<void> {
    if (!this.signUpForm.valid) return;
    const signUpModel = this.signUpForm.value;
    await this.signUpWithEmail(signUpModel);
  }

  onSocialLogin(result: any): void {
    this.redirectToHome();
  }

  async signInWithEmail(username: string, password: string): Promise<void> {
    await this.auth.emailLogin(username, password);
    await this.redirectToHome();
  }

  async signUpWithEmail(signUpModel: SignUpModel): Promise<void> {
    await this.auth.emailSignUp(signUpModel);
    await this.redirectToHome();
  }

  async signInWithGoogle(): Promise<void> {
    await this.auth.googleLogin();
    await this.redirectToHome();
  }

  private loadViewForms() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', Validators.required]
    }) as LoginForm;

    this.signUpForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
      confirmPassword: ['', PasswordValidation],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }, {
        validator: MustMatch('password', 'confirmPassword')
      }) as SignUpForm;
  }

  private redirectToHome(): Promise<boolean> {
    return this.router.navigate(['/']);
  }
}


