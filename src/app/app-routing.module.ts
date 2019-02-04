import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { PublicGuard } from './core/public.guard';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { ListDragonComponent } from './pages/dragons/list/list.dragon.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SsrPageComponent } from './ui/ssr-page/ssr-page.component';
import { UploadPageComponent } from './uploads/upload-page/upload-page.component';
import { EditDragonComponent } from './pages/dragons/edit/edit.dragon.component';




const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'dragons', component: ListDragonComponent, canActivate: [AuthGuard] },
  { path: 'dragons/create', component: EditDragonComponent, canActivate: [AuthGuard] },
  { path: 'dragons/edit/:id', component: EditDragonComponent, canActivate: [AuthGuard] },
  { path: 'notes', component: NotesListComponent, canActivate: [AuthGuard] },
  { path: 'uploads', component: UploadPageComponent, canActivate: [AuthGuard] },
  { path: 'ssr', component: SsrPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
