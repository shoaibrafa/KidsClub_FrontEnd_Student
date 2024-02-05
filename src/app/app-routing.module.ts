import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckComponent } from './check/check.component';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArtComponent } from './components/art/art.component';
import { PhotographyComponent } from './components/photography/photography.component';
import { authGuard } from './login/auth.guard';
import { SettingComponent } from './setting/setting.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate:[authGuard], children: [
    { path: '', component: DashboardComponent, canActivate:[authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard]},
    { path: 'articles', component: ArticlesComponent, canActivate:[authGuard] },
    { path: 'arts', component: ArtComponent, canActivate:[authGuard] },
    { path: 'photography', component: PhotographyComponent, canActivate:[authGuard] },
    { path: 'settings', component: SettingComponent, canActivate:[authGuard]}
  ] },
  { path: 'check', component: CheckComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
