import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog } from '@angular/material';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { ChangePictureDialogComponent } from './change-picture-dialog/change-picture-dialog.component';

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
    private router: Router
  ) { 
    console.log($(window).height());
    if (!this.userService.loggedIn) {
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
    console.log('Hey');
    console.log( this.userDetails);
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
        dialog = this.dialog.open(EditProfileDialogComponent, {
          data: this.userDetails
        });
      }
    });
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
}