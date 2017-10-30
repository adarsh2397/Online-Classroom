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
  private classrooms: any;

  private clicked = false;

  private wrapperheight = ($(window).height()-50) + 'px';

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  searchClassroom() {
    this.classrooms = [];
    if (this.searchText != '') {
      const data = {
        courseCode: this.searchText
      }
      this.clicked = true;
      this.userService.searchClassroom(data).subscribe((response) => {
        if (response['_body'] == 'Failure') {
          alert('Server Failed');
        } else if (response['_body'] != '') {
          this.classrooms = JSON.parse(response['_body']);
          //console.log(this.classrooms);
        } else {
          this.classrooms = [];
        }
      });
    }
  }

  joinClassroom(classroom) {
    const data = {
      userId: this.userService.getUserID(),
      classroomId: classroom.id
    }

    this.userService.joinClassroom(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        let dialog = this.dialog.open(MessageDialogComponent, {
          data: {
            message: 'Successfully Joined Classroom with Course Code: ' + classroom.course_code
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
