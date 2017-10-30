import { Component, Inject   } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-edit-classroom-dialog',
  templateUrl: './edit-classroom-dialog.component.html',
  styleUrls: ['./edit-classroom-dialog.component.css']
})
export class EditClassroomDialogComponent {

  private courseName: string;
  private courseCode: string;
  private description: string;
  private startDate: Date;
  private endDate: Date;
  private adminId = 0;

  constructor(
    public dialogRef: MdDialogRef<EditClassroomDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private userService: UserService,
  ) { 
    console.log(data);
    this.courseName = data.course_name;
    this.courseCode = data.course_code;
    this.description = data.description;
    this.startDate = new Date(data.start_date.replace('Z',''));
    this.endDate = new Date(data.end_date.replace('Z',''));
  }
  

  updateClassroom() {
    const data = {
      course_name: this.courseName,
      course_code: this.courseCode,
      description: this.description?this.description:'None',
      start_date: this.startDate,
      end_date: this.endDate,
      c_id: this.data.id
    }

    this.userService.updateClassroom(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        this.dialogRef.close('Changed');
      }
    });

  }



}
