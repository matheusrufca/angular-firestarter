import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { EmailValidation, PasswordValidation } from 'src/app/core/validators/validators';
import { LoginModel } from 'src/app/interfaces/Login';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public readonly auth: AuthService, private readonly router: Router, private readonly formBuilder: FormBuilder) {
    this.loadViewForms();
  }

  private loadViewForms() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', Validators.required]
    }) ;

    this.registerForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
      confirmPassword: ['', PasswordValidation],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit() { }

  public login(): void {
    console.debug('login');
  }

  public register(): void {
    console.debug('register');
  }


  async signInWithGithub(): Promise<boolean> {
    await this.auth.githubLogin();
    return await this.afterSignIn();
  }

  async signInWithGoogle(): Promise<boolean> {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  async signInWithFacebook(): Promise<boolean> {
    await this.auth.facebookLogin();
    return await this.afterSignIn();
  }

  async signInWithTwitter(): Promise<boolean> {
    await this.auth.twitterLogin();
    return await this.afterSignIn();
  }

  async signInAnonymously(): Promise<boolean> {
    await this.auth.anonymousLogin();
    return await this.afterSignIn();
  }

  private afterSignIn(): Promise<boolean> {
    return this.router.navigate(['/']);
  }
}


