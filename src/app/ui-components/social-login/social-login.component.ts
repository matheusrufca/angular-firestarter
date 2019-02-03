import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { ProviderActionMap } from './LoginProviderEnum';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})


export class SocialLoginComponent implements OnInit {
  private readonly providerAction: ProviderActionMap = {
    Google: {
      loginAction: async () => await this.auth.googleLogin()
    }
  };

  constructor(private readonly auth: AuthService) { }

  ngOnInit() { }

  onProviderClick($event: string): void {
    console.debug("SocialLoginComponent:onProviderClick", $event);
    this.signIn($event);
  }

  private signIn(provider: string) {
    this.providerAction[provider].loginAction();
  }
}


