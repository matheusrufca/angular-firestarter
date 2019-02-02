import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public confirmPassword : string;

constructor(public readonly auth: AuthService, private readonly router: Router) {
  this.username = "";
  this.password = "";
  this.confirmPassword = "";
}

ngOnInit() { }

async signInWithGithub(): Promise < boolean > {
  await this.auth.githubLogin();
  return await this.afterSignIn();
}

async signInWithGoogle(): Promise < boolean > {
  await this.auth.googleLogin();
  return await this.afterSignIn();
}

async signInWithFacebook(): Promise < boolean > {
  await this.auth.facebookLogin();
  return await this.afterSignIn();
}

async signInWithTwitter(): Promise < boolean > {
  await this.auth.twitterLogin();
  return await this.afterSignIn();
}

async signInAnonymously(): Promise < boolean > {
  await this.auth.anonymousLogin();
  return await this.afterSignIn();
}

  private afterSignIn(): Promise < boolean > {
  return this.router.navigate(['/']);
}
}
