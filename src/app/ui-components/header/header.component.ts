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
  private readonly avatarPlaceholder = "../../../assets/images/profile-pic-placeholder.png";

  constructor(private readonly auth: AuthService, private readonly router: Router) { }
  ngOnInit(): void {
    this.auth.user.subscribe((user: User) => this.setUser(user));
  }

  private setUser(user: User): void {
    this.user = user || null;
  }

  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error("logout", error)
    } finally {
      this.router.navigate(['/login']);
    }
  }

  getProfilePicture(): string {
    return this.user.photoURL || this.avatarPlaceholder;
  }
}
