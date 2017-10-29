import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  private classrooms: Array<any>;
  private selectedClassroom;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.userService.loggedIn == false) {
      this.router.navigate(['home']);
    } else {
      if (this.userService.profileUpdated == false) {
        this.router.navigate(['dashboard']);
      }
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
        console.log(this.classrooms);
      }
    });
  }

  selectClassroom(index) {
    this.selectedClassroom = this.classrooms[index];
  }

  refreshClassrooms() {
    this.getClassroomsList();
  }

  leaveClassroom() {
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

}
