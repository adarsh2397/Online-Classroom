import { Component, Inject   } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  private currentPassword = '';
  private newPassword = '';
  private confirmPassword = '';

  private error: string;

  constructor(
    public dialogRef: MdDialogRef<ChangePasswordComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private userService: UserService,
  ) { }

  changePasswordHelper() {
    this.error = 'Hey';
    if (this.newPassword == this.confirmPassword) {

      const data = {
        id: this.userService.getUserID(),
        old_password: this.currentPassword,
        new_password: this.newPassword
      }

      this.userService.changePassword(data).subscribe((response) => {
        if (response['_body'] == 'Failure') {
          alert('Server Failed');
        } else if (response['_body'] == 'Success') {
          this.dialogRef.close('Success');
        } else if (response['_body'] == 'Invalid') {
          this.error = 'Invalid Current Password';
        }
      });

    } else {
      this.error = 'Passwords Don\'t Match';
    }
  }

}
