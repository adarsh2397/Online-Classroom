import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.userService.loggedIn == false) {
      this.router.navigate(['home']);
    }
  }

  createClassroomHelper() {
    const data = {
      courseName: this.courseName,
      courseCode: this.courseCode,
      description: this.description,
      startDate: this.startDate,
      adminId: this.userService.getUserID(),
      endDate: this.endDate
    }

    this.userService.createClassroom(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Failed');
      } else {
        alert('Success');
      }
    });
  }
}
