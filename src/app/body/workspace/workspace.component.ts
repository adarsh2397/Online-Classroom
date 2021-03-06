import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  private classrooms: Array<any>;
  private selectedClassroom;

  private windowheight = ($(document).height()-50) + 'px';

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
    if (this.userService.loggedIn == false) {
      this.router.navigate(['home']);
    } else {
      this.getClassroomsList();
    }
  }

  getClassroomsList() {
    const data = {
      id: this.userService.getUserID(),
      type: this.userService.getUserType()
    }

    this.userService.getClassrooms(data).subscribe((response) => {
      if (response['_body'] != 'Failure') {
        this.classrooms = JSON.parse(response['_body']);
      }
    });
  }

  selectClassroom(index) {
    this.selectedClassroom = this.classrooms[index];
  }

  refreshClassrooms() {
    this.selectedClassroom = null;
    this.getClassroomsList();
  }

  leaveClassroom() {

    if (this.userService.getUserID() != this.selectedClassroom.admin_id) {
      let dialog = this.dialog.open(ConfirmDialogComponent,{
        data: {
          question: 'Are you sure you want to leave the classroom?'
        }
      });

      dialog.afterClosed().subscribe((response) => {
        if (response == 'Confirmed') {
          const data = {
            type: this.userService.getUserType(),
            c_id: this.selectedClassroom.id,
            u_id: this.userService.getUserID()
          }

          this.userService.leaveClassroom(data).subscribe((response) => {
            if (response['_body'] == 'Failure') {
              alert('Server Failed');
            } else {
              this.refreshClassrooms();
            }
          });
        }
      });
    } else {
      // Admin is leaving the classroom
      let dialog = this.dialog.open(ConfirmDialogComponent,{
        data: {
          question: 'The Classroom may be deleted if no other teacher is a member of this classroom. Are you sure you want to continue?'
        }
      });

      dialog.afterClosed().subscribe((response) => {
        if (response == 'Confirmed') {
          const data = {
            type: this.userService.getUserType(),
            c_id: this.selectedClassroom.id,
            t_id: this.userService.getUserID()
          }

          this.userService.adminLeaveClassroom(data).subscribe((response) => {
            if (response['_body'] == 'Failure') {
              alert('Server Failed');
            } else if (response['_body'] == 'Success') {
              this.refreshClassrooms();
            }
          });
        }
      });
    }
  }

  classroomUpdate(event) {
    const data = {
      id: this.userService.getUserID(),
      type: this.userService.getUserType()
    }
    this.userService.getClassrooms(data).subscribe((response) => {
      if (response['_body'] != 'Failure') {
        this.classrooms = JSON.parse(response['_body']);
        for(let classroom of this.classrooms) {
          if (classroom.id == parseInt(event)) {
            this.selectedClassroom = classroom;
            break;
          }
        }
      }
    });
  }

  closeClassroom() {
    this.selectedClassroom = null;
  }

  
}
