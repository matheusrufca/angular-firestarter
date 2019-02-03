import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService, User } from 'src/app/core/auth.service';
import { ProviderActionMap } from './LoginProviderEnum';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})


export class SocialLoginComponent implements OnInit {
  @Output() onLogin = new EventEmitter<User>();
  @Output() onLoginError = new EventEmitter<any>();

  private readonly providerAction: ProviderActionMap = {
    Google: {
      loginAction: async () => await this.auth.googleLogin()
    }
  };

  constructor(private readonly auth: AuthService) { }

  ngOnInit() { }

  async onProviderClick($event: string): Promise<void> {
    try {
      const signResult = await this.signIn($event);
      this.onLogin.emit(signResult);
    } catch (error) {
      this.onLoginError.emit(error);
    }
  }

  private async signIn(provider: string): Promise<User> {
    return await this.providerAction[provider].loginAction();
  }
}


