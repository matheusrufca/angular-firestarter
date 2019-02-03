import { SignUpModel } from './../interfaces/Login.d';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private readonly router: Router,
    private readonly notify: NotifyService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
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

  private async oAuthLogin(provider: any): Promise<User> {
    let credential;
    try {
      credential = await this.afAuth.auth.signInWithPopup(provider);
      this.notify.update('Welcome to Firestarter!!!', 'success');
      await this.updateUserData(credential.user);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
    return credential.user;
  }

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => {
        this.handleError(error);
        throw error;
      });
  }

  async emailSignUp(credentials: SignUpModel) {
    let credential;
    try {
      credential = await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
      this.notify.update('Welcome new user!', 'success');
      await this.updateUserData(Object.assign({}, credential.user, {
        displayName: `${credentials.firstName} ${credentials.lastName}`
      }));
    } catch (error) {
      this.handleError(error);
      throw error;
    }
    return credential.user;
  }

  async emailLogin(email: string, password: string): Promise<User> {
    let credential;
    try {
      credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.notify.update('Welcome back!', 'success');
      await this.updateUserData(credential.user);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
    return credential.user;
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  private async updateUserData(user: User): Promise<void> {
    const userPath = `users/${user.uid}`;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(userPath);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    };

    return await userRef.set(userData);
  }
}
