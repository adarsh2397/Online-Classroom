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
  private usersMap: Map<any,any>;
  private adminTeacher: any;

  private newPostTitle: string;
  private newPostContent: string;

  private newResourceName: string;
  private newResourceUrl: string;

  private threadReply: Array<string>;

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
    this.clearPost();
    this.clearResource();
  }

  refreshPostsThreads() {
    this.getPosts();
    this.getThreads();
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
        this.threadReply = new Array<string>(this.posts.length);
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

        this.usersMap = new Map<any,any>();
        for(let student of this.students) {
          this.usersMap.set(student.id, student);
        }
        for(let teacher of this.teachers) {
          this.usersMap.set(teacher.id, teacher);
        }
        console.log(this.usersMap);
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

  showHideReplies(id) {
    $('#replies' + id).slideToggle('slow');
  }

  createPost() {
    const data = {
      title: this.newPostTitle,
      content: this.newPostContent,
      c_id: this.classroom.id,
      u_id: this.userService.getUserID()
    }

    this.userService.createPost(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        this.clearPost();
        this.refreshPostsThreads();
      }
    });
  }

  clearPost() {
    this.newPostContent = '';
    this.newPostTitle = '';
  }

  createThread(index,post_id) {
    const data = {
      p_id: post_id,
      content: this.threadReply[index],
      u_id: this.userService.getUserID()
    }

    this.userService.createThread(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        this.refreshPostsThreads();
      }
    });
  }

  deletePost(id) {
    const data = {
      id: id
    }

    this.userService.deletePost(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        this.refreshPostsThreads();
      }
    });
  }

  deleteThread(id) {
    const data = {
      id: id
    }

    this.userService.deleteThread(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        this.refreshPostsThreads();
      }
    });
  }

  clearResource() {
    this.newResourceName = '';
    this.newResourceUrl = '';
  }
  
  refreshResources() {
    this.getResources();
  }

  addResource() {
    const data = {
      name: this.newResourceName,
      url: this.newResourceUrl,
      u_id: this.userService.getUserID(),
      c_id: this.classroom.id
    }

    this.userService.addResource(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else {
        this.refreshResources();
        this.clearResource();
      }
    });
  }

  deleteResource(id) {
    const data = {
      id: id
    }

    this.userService.deleteResource(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else {
        this.refreshResources();
      }
    });
  }

  refreshClassroomInfo() {
    this.getClassroomInfo();
  }

  kickFromClassroom(type,s_id) {
    const data = {
      type: type,
      c_id: this.classroom.id,
      s_id: s_id
    }

    this.userService.leaveClassroom(data).subscribe((response) => {
        if (response['_body'] == 'Failure') {
          alert('Server Failed');
        } else {
          this.refreshClassroomInfo();
        }
    });
  }
}
