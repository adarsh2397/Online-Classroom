import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { MdNativeDateModule } from '@angular/material';

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
import { CreateClassroomComponent } from './body/create-classroom/create-classroom.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { JoinClassroomComponent } from './body/join-classroom/join-classroom.component';
import { ClassroomComponent } from './body/workspace/classroom/classroom.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ChangePictureDialogComponent } from './body/dashboard/change-picture-dialog/change-picture-dialog.component';
import { ChangePasswordComponent } from './body/dashboard/change-password/change-password.component';
import { EditClassroomDialogComponent } from './body/workspace/classroom/edit-classroom-dialog/edit-classroom-dialog.component';

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
    WorkspaceComponent,
    CreateClassroomComponent,
    MessageDialogComponent,
    JoinClassroomComponent,
    ClassroomComponent,
    ConfirmDialogComponent,
    ChangePictureDialogComponent,
    ChangePasswordComponent,
    EditClassroomDialogComponent
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
    EditProfileDialogComponent,
    MessageDialogComponent,
    ConfirmDialogComponent,
    ChangePictureDialogComponent,
    ChangePasswordComponent,
    EditClassroomDialogComponent
  ]
})
export class AppModule { }
