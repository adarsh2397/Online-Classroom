import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css']
})
export class CreateClassroomComponent implements OnInit {

  private courseName: string;
  private courseCode: string;
  private description: string;
  private startDate: Date;
  private endDate: Date;
  private adminId = 0;

  private todayDate = new Date();

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
    if (this.userService.loggedIn == false) {
      this.router.navigate(['home']);
    }
  }

  createClassroomHelper() {
    let sd = new Date(this.startDate);
    sd.setDate((sd.getDate()+1));
    let ed = new Date(this.endDate);
    ed.setDate((ed.getDate()+1));

    const data = {
      courseName: this.courseName,
      courseCode: this.courseCode,
      description: this.description,
      startDate: sd.toISOString().slice(0,19).replace('T',' '),
      adminId: this.userService.getUserID(),
      endDate: ed.toISOString().slice(0,19).replace('T',' ')
    }

    this.userService.createClassroom(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        let dialog = this.dialog.open(MessageDialogComponent,{
          data: {
            message: 'Unsuccessful. Please try again later.'
          }
        });
      } else if (response['_body'] == 'Success') {
        let dialog = this.dialog.open(MessageDialogComponent,{
          data: {
            message: 'Classroom Successfully Created'
          }
        });
        dialog.afterClosed().subscribe(() => {
          this.router.navigate(['home']);
        });
      } else if (response['_body'] == 'Duplicate') {
        this.courseCode = '';
        let dialog = this.dialog.open(MessageDialogComponent, {
          data: {
            message: 'Course Code Already Exists'
          }
        })
      }
    });
  }
}
