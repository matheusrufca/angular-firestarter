import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SignUpModel } from './../interfaces/Login.d';
import { NotifyService } from './notify.service';



export interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;
  authState: firebase.User;


  constructor(
    private readonly angularFireAuth: AngularFireAuth,
    private readonly anguarlFirestore: AngularFirestore,
    private readonly router: Router,
    private readonly notificationService: NotifyService
  ) {
    this.user = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.anguarlFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.angularFireAuth.authState.subscribe((user: firebase.User) => {
      this.authState = user;
    });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  anonymousLogin() {
    return this.angularFireAuth.auth
      .signInAnonymously()
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  async emailSignUp(credentials: SignUpModel) {
    let credential;
    try {
      credential = await this.angularFireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
      await this.updateUserData(Object.assign({}, credential.user, {
        displayName: `${credentials.firstName} ${credentials.lastName}`
      }));
    } catch (error) {
      this.handleError(error);
    }
    return credential.user;
  }

  async emailLogin(email: string, password: string): Promise<User> {
    let credential;
    try {
      debugger;
      credential = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.handleError(error);
    }
    return credential.user;
  }

  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .catch(error => this.handleError(error));
  }

  isAuthenticated(): boolean {
    return !!this.authState;
  }

  async signOut(): Promise<void> {
    try {
      await this.angularFireAuth.auth.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      this.handleError(error);
    }
  }

  private async oAuthLogin(provider: any): Promise<User> {
    let credential;
    try {
      credential = await this.angularFireAuth.auth.signInWithPopup(provider);
      await this.updateUserData(credential.user);
    } catch (error) {
      this.handleError(error);
    }
    return credential.user;
  }

  private handleError(error: Error) {
    this.notificationService.notify(error.message, 'Error');
  }

  private async updateUserData(user: User): Promise<void> {
    const userPath = `users/${user.uid}`;
    const userRef: AngularFirestoreDocument<User> = this.anguarlFirestore.doc(userPath);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    };

    return await userRef.set(userData);
  }
}
