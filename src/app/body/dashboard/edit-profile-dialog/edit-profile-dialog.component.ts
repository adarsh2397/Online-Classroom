import { Component, Inject   } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent {

  private type;

  private firstname;
  private lastname;
  private city;
  private house;
  private pincode;
  private email;
  private phone_no;
  private gender = 'Male';

  // Student Specific
  private degree;
  private degreeOptions = ['B.Tech','M.Tech','Ph.D','MCA'];
  private roll_no;
  private reg_no;

  // Teacher Specific
  private designation;
  private about;

  constructor(
    public dialogRef: MdDialogRef<EditProfileDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackbar: MdSnackBar
  ) {
    this.type = this.userService.getUserType();
    this.getUserDetails();
  }

  getUserDetails() {
    this.firstname = this.data.firstname;
    this.lastname = this.data.lastname;
    this.city = this.data.city;
    this.house = this.data.house;
    this.pincode = this.data.pincode;
    this.phone_no = this.data.phone_no;
    this.email = this.data.email;

    if (this.userService.profileUpdated) {
      if (this.userService.getUserType() == 'Student') {
        this.degree = this.data.degree;
        this.roll_no = this.data.roll_no;
        this.gender = this.data.gender;
        this.reg_no = this.data.reg_no;
      } else if (this.userService.getUserType() == 'Teacher') {
        this.about = this.data.about;
        this.gender = this.data.gender;
        this.designation = this.data.designation;
      }
    }
  }

  saveProfile() {
    let data = {};

    if (this.type == 'Student') {
      data = {
        id: this.userService.getUserID(),
        type: this.type,
        firstname: this.firstname,
        lastname: this.lastname,
        house: (this.house)?this.house:'',
        gender: this.gender,
        email: this.email,
        phone_no: this.phone_no,
        pincode: this.pincode?this.pincode:'',
        city: this.city ,
        roll_no: this.roll_no,
        reg_no: this.reg_no,
        degree: this.degree
      }

    } else {
      data = {
        id: this.userService.getUserID(),
        type: this.type,
        firstname: this.firstname,
        lastname: this.lastname,
        house: this.house?this.house:'',
        gender: this.gender,
        email: this.email,
        phone_no: this.phone_no,
        pincode: this.pincode?this.pincode:'',
        city: this.city,
        about: this.about,
        designation: this.designation
      }
    }

    this.userService.saveProfile(data)
      .subscribe((response) => {
        if (response['_body'] == 'Success') {
          this.snackbar.open('Profile Updated Successfully','',{
            duration: 3000
          });
          this.dialogRef.close('Updated');
        } else if (response['_body'] == 'Failure') {
          this.snackbar.open('Error updating profile','',{
            duration: 3000
          });
        }
      });
  }

}
