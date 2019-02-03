import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
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

  constructor(public readonly auth: AuthService, private readonly router: Router, private readonly formBuilder: FormBuilder) {
    this.loadViewForms();
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

  ngOnInit() { }

  async login(): Promise<void> {
    if (!this.loginForm.valid) return;
    try {
      const credentials = this.loginForm.value;
      await this.signInWithEmail(credentials.email, credentials.password);
    } catch (error) {
      throw error;
    }
    console.debug('login', this.loginForm);
  }

  async signUp(): Promise<void> {
    if (!this.signUpForm.valid) return;
    const signUpModel = this.signUpForm.value;
    await this.signUpWithEmail(signUpModel);
  }

  async signInWithEmail(username: string, password: string): Promise<void> {
    try {
      await this.auth.emailLogin(username, password);
      await this.afterSignIn();
    } catch (error) { }
  }

  async signUpWithEmail(signUpModel: SignUpModel): Promise<void> {
    try {
      await this.auth.emailSignUp(signUpModel);
      await this.afterSignIn();
    } catch (error) { }
  }

  async signInWithGithub(): Promise<void> {
    try {
      await this.auth.githubLogin();
      await this.afterSignIn();
    } catch (error) { }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      await this.auth.googleLogin();
      await this.afterSignIn();
    } catch (error) { }
  }

  async signInWithFacebook(): Promise<void> {
    try {
      await this.auth.facebookLogin();
      await this.afterSignIn();
    } catch (error) { }
  }

  async signInWithTwitter(): Promise<void> {
    try {
      await this.auth.twitterLogin();
      await this.afterSignIn();
    } catch (error) { }
  }

  async signInAnonymously(): Promise<void> {
    try {
      await this.auth.anonymousLogin();
      await this.afterSignIn();
    } catch (error) { }
  }

  private afterSignIn(): Promise<boolean> {
    return this.router.navigate(['/']);
  }
}


