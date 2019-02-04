import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AvatarModule } from 'ngx-avatar';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './modules/material.module';
import { EditDragonComponent } from './pages/dragons/edit/edit.dragon.component';
import { CreateDialogComponent as CreateDragonDialogComponent } from './pages/dragons/list/create-dialog/create-dialog.component';
import { ListDragonComponent } from './pages/dragons/list/list.dragon.component';
import { RemoveConfirmationDialogComponent as RemoveDragonConfirmationDialogComponent } from './pages/dragons/list/remove-confirmation-dialog/remove-confirmation-dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './ui-components/header/header.component';
import { ButtonGoogleComponent } from './ui-components/social-login/button-google/button-google.component';
import { SocialLoginComponent } from './ui-components/social-login/social-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ButtonGoogleComponent,
    SocialLoginComponent,
    ListDragonComponent,
    HomeComponent,
    RemoveDragonConfirmationDialogComponent,
    CreateDragonDialogComponent,
    EditDragonComponent
  ],
  entryComponents: [RemoveDragonConfirmationDialogComponent, CreateDragonDialogComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AvatarModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
