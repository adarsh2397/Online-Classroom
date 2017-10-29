import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-join-classroom',
  templateUrl: './join-classroom.component.html',
  styleUrls: ['./join-classroom.component.css']
})
export class JoinClassroomComponent implements OnInit {

  private searchText: string;
  private classroom: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  searchClassroom() {
    const data = {
      courseCode: this.searchText
    }

    this.userService.searchClassroom(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] != '') {
        this.classroom = JSON.parse(response['_body'])[0];
        console.log(this.classroom);
      } else {
        this.classroom = "";
      }
    });
  }

  joinClassroom() {
    const data = {
      userId: this.userService.getUserID(),
      classroomId: this.classroom.id
    }

    this.userService.joinClassroom(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        let dialog = this.dialog.open(MessageDialogComponent, {
          data: {
            message: 'Successfully Joined Classroom with Course Code: ' + this.classroom.course_code
          }
        });
        dialog.afterClosed().subscribe(() => {
          this.router.navigate(['workspace']);
        });
      } else if (response['_body'] == 'Joined') {
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: 'You are already a part of this classroom'
          }
        });
      }
    })
  }

}
