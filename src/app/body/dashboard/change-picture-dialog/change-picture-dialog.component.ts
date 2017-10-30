import { Component, Inject   } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-change-picture-dialog',
  templateUrl: './change-picture-dialog.component.html',
  styleUrls: ['./change-picture-dialog.component.css']
})
export class ChangePictureDialogComponent {

  constructor(
    public dialogRef: MdDialogRef<ChangePictureDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private userService: UserService,
  ) { }

  private imageFile: any;

  fileChangeEvent(fileInput: any) {
    this.imageFile = <Array<File>>fileInput.target.files;
    console.log(this.imageFile);
  }

  updatePicture() {
    if (this.imageFile.length == 0) {
      alert('Image Not Selected');
    }
    const formData = new FormData();
    const files:Array<File> = this.imageFile;

    formData.append("uploads[]", files[0], this.userService.userDetails.username + '.' + files[0].name.split('.')[1]);

    this.userService.uploadImage(formData).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else {
        response = JSON.parse(response['_body']);
        if (response.status == 'Success') {
          console.log(response.url);
          const data = {
            id: this.userService.getUserID(),
            profilepic: response.url
          }

          this.userService.changeProfilePicture(data).subscribe((response) => {
            if (response['_body'] == 'Failure') {
              alert('Server Failed');
            } else if(response['_body'] == 'Success') {
              this.dialogRef.close('Changed');
            }
          })
        }
      }
    });
  }
}
