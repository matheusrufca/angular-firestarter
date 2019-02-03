import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(private readonly auth: AuthService, private readonly router: Router) { }
  ngOnInit(): void {
    this.auth.user.subscribe((user: User) => {
      console.debug("user", user);
      this.user = user;
    });
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error("logout", error)
    } finally {
      this.router.navigate(['/login']);
    }
  }
}
