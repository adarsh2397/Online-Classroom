import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './body/home/home.component';
import { LoginComponent } from './body/home/login/login.component';
import { RegisterComponent } from './body/home/register/register.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';

import { LoginService } from './services/login.service';
import { UtilityService } from './services/utility.service';
import { UserService } from './services/user.service';
import { EditProfileDialogComponent } from './body/dashboard/edit-profile-dialog/edit-profile-dialog.component';
import { WorkspaceComponent } from './body/workspace/workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditProfileDialogComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoginService,
    UtilityService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditProfileDialogComponent
  ]
})
export class AppModule { }
