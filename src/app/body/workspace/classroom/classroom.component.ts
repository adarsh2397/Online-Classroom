import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit, OnChanges {
  @Input() classroom;

  private posts: Array<any>;
  private threads: Map<any,any>;
  private resources: Array<any>;

  private teachers: Array<any>;
  private students: Array<any>;

  private adminTeacher: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getPosts();
    this.getThreads();
    this.getResources();
    this.getClassroomInfo();
  }


  getPosts() {
    const data = {
      c_id: this.classroom.id
    }
    this.userService.getPosts(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else {
        this.posts = JSON.parse(response['_body']);
        console.log(this.posts);
      }
    });
  }

  getThreads() {
    const data = {
      c_id: this.classroom.id
    }
    this.userService.getThreads(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else {
        let threads = JSON.parse(response['_body']);
        console.log(threads);
        this.threads = new Map<any,Array<any>>();
        for(let thread of threads) {
          if (!this.threads.get(thread.p_id)) {
            this.threads.set(thread.p_id, new Array<any>());
          }
          this.threads.get(thread.p_id).push(thread);
        }
        console.log(this.threads);
      }
    });
  }

  getResources() {
    const data = {
      c_id: this.classroom.id
    }

    this.userService.getResources(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else {
        this.resources = JSON.parse(response['_body']);
        console.log(this.resources);
      }
    });
  }

  getClassroomInfo() {
    const data = {
      c_id: this.classroom.id
    }

    this.userService.getClassroomInfo(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else {
        //this.teachers = new Array<any>();
        //this.students = new Array<any>();
        console.log(response['_body']);
        response = JSON.parse(response['_body']);
        console.log(response);
        this.teachers = response.teachers;
        this.students = response.students;
        console.log(this.teachers)
        console.log(this.students);
        this.resolveAdmin();
      }
    });
  }

  resolveAdmin() {
    for(var i = 0; i<this.teachers.length;i++) {
      if (this.teachers[i].id == this.classroom.admin_id) {
        this.adminTeacher = this.teachers[i];
        this.teachers.splice(i,i+1);
        break;
      }
    }
    console.log(this.adminTeacher);
  }
}
