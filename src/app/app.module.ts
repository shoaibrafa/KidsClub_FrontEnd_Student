import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckComponent } from './check/check.component';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { UserPhotoComponent } from './sidebar/user-photo/user-photo.component';
import { ArtComponent } from './components/art/art.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PhotographyComponent } from './components/photography/photography.component';
import { ExpandArtComponent } from './components/art/expand-art/expand-art.component';
import { NewArtComponent } from './components/art/new-art/new-art.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoginInterceptorService } from './login/login-interceptor.service';
import { LoginService } from './login/login.service';
import { RootService } from './root.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import { SettingComponent } from './setting/setting.component';
import { SsmComponent } from './sidebar/ssm/ssm.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CheckComponent,
    ErrorComponent,
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    UserPhotoComponent,
    ArticlesComponent,
    ArtComponent,
    PhotographyComponent,
    ExpandArtComponent,
    NewArtComponent,
    SpinnerComponent,
    SettingComponent,
    SsmComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    
  ],
  providers: [RootService, LoginService, {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
