import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog } from '@angular/material';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userDetails: any;

  constructor(
    private userService: UserService,
    private dialog: MdDialog,
    private router: Router
  ) { 
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

}