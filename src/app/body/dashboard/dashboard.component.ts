import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog, MdSnackBar } from '@angular/material';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { ChangePictureDialogComponent } from './change-picture-dialog/change-picture-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userDetails: any;

  private wrapperHeight = ($(window).height() - 50) + 'px';

  constructor(
    private userService: UserService,
    private dialog: MdDialog,
    private router: Router,
    private snackbar: MdSnackBar
  ) { 
    console.log($(window).height());
    if (!localStorage.getItem('user_id')) {
      this.router.navigate(['home']);
    }
  }
  

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    if (this.userService){
      this.userService.userLoaded.subscribe((details) => {
        this.userDetails = details;
        if (this.userService.profileUpdated == false) {
          this.checkUserDetails();
        }
      });
    }
  }

  checkUserDetails() {
    if (this.userDetails) {
      this.openEditProfile();
    }
  }

  openEditProfile() {
    if (this.userService.profileUpdated == false) {
      let dialog = this.dialog.open(EditProfileDialogComponent, {
        data: this.userDetails
      });

      dialog.afterClosed().subscribe((status) => {
        if (status == 'Updated') {
          const data = {
            id: this.userService.getUserID(),
            type: this.userService.getUserType()
          }
          this.userService.getUserDetails(data);
          this.userDetails.profileUpdated = true;
        } else if (this.userService.profileUpdated == false) {
          this.openEditProfile();
        }
      });
    } else {
      let dialog = this.dialog.open(EditProfileDialogComponent, {
        data: this.userDetails
      });
      dialog.afterClosed().subscribe((status) => {
        if (status == 'Updated') {
          const data = {
            id: this.userService.getUserID(),
            type: this.userService.getUserType()
          }
          this.userService.getUserDetails(data);
          this.userDetails.profileUpdated = true;
        }
      });
    }
  }

  changePicture() {
    let dialog = this.dialog.open(ChangePictureDialogComponent);
    dialog.afterClosed().subscribe((response) => {
      if (response == 'Changed') {
        const data = {
          id: this.userService.getUserID(),
          type: this.userService.getUserType()
        }
        this.userService.getUserDetails(data);
      }
    });
  }

  removePicture() {
    const data = {
      id: this.userService.getUserID(),
      profilepic: 'http://localhost:3000/defaultpic.png'
    }

    this.userService.changeProfilePicture(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        const data = {
          id: this.userService.getUserID(),
          type: this.userService.getUserType()
        }
        this.userService.getUserDetails(data);
      }
    });
  }

  changePassword() {
    let dialog = this.dialog.open(ChangePasswordComponent);
    dialog.afterClosed().subscribe((response) => {
      if (response == 'Success') {
        this.snackbar.open('Successfully Changed','',{
          duration: 3000
        });
      }
    });
  }
}