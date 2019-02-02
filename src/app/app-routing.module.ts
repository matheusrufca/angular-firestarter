import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { SsrPageComponent } from './ui/ssr-page/ssr-page.component';
import { UploadPageComponent } from './uploads/upload-page/upload-page.component';




const routes: Routes = [
  { path: '', component: HomePageComponent },
  // { path: 'login', component: UserLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesListComponent, canActivate: [AuthGuard] },
  { path: 'uploads', component: UploadPageComponent, canActivate: [AuthGuard] },

  { path: 'ssr', component: SsrPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
