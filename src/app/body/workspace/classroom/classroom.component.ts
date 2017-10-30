import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';

import { UserService } from '../../../services/user.service';

import { EditClassroomDialogComponent } from './edit-classroom-dialog/edit-classroom-dialog.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit, OnChanges {
  @Input() classroom;
  @Output() classroomChanged: EventEmitter<any> = new EventEmitter();

  private today = new Date();

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

  private editOn = false;
  private editPostTitle: string;
  private editPostContent: string;
  private scrollPosition: number;
  private editPostId: number;

  private editThreadOn: Array<boolean>;
  private editThreadReply: string;
  private editThreadId: number;
  private editThreadIndex: number;

  constructor(
    private userService: UserService,
    private dialog: MdDialog
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
        this.editThreadOn = new Array<boolean>(this.posts.length);
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

    if (data.content && data.content.length) {
      this.userService.createThread(data).subscribe((response) => {
        if (response['_body'] == 'Failure') {
          alert('Server Failed');
        } else if (response['_body'] == 'Success') {
          this.refreshPostsThreads();
        }
      });
    }
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

  kickFromClassroom(type,u_id) {
    const data = {
      type: type,
      c_id: this.classroom.id,
      u_id: u_id
    }

    this.userService.leaveClassroom(data).subscribe((response) => {
        if (response['_body'] == 'Failure') {
          alert('Server Failed');
        } else {
          this.refreshClassroomInfo();
        }
    });
  }

  editPost(post) {
    this.editOn = true;
    this.scrollPosition = $('#classroom-window').scrollTop();
    $('#classroom-window').animate({
            scrollTop: 0
        }, 300);
    this.editPostTitle = post.title;
    this.editPostContent = post.content;
    this.editPostId = post.id;
  }

  updatePost() {
    const data = {
      title: this.editPostTitle,
      content: this.editPostContent,
      id: this.editPostId
    }
    this.userService.updatePost(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        this.cancelEdit();
        this.refreshPostsThreads();
        let dict = {
          scrollTop: this.scrollPosition
        }
        console.log(dict);
        $('#classroom-window').animate(dict, 300);
      }
    });
  }

  cancelEdit() {
    this.editOn = false;
    this.editPostTitle = '';
    this.editPostContent = '';
    this.editPostId = null;
  }

  editThread(thread, i) {
    if (this.editThreadIndex != null) {
      this.editThreadOn[this.editThreadIndex] = false;
    }
    this.editThreadOn[i] = true;
    this.editThreadReply = thread.content;
    this.editThreadId = thread.id;
    this.editThreadIndex = i;
  }

  updateThread() {
    const data = {
      content: this.editThreadReply,
      id: this.editThreadId
    }

    this.userService.updateThread(data).subscribe((response) => {
      if (response['_body'] == 'Failure') {
        alert('Server Failed');
      } else if (response['_body'] == 'Success') {
        this.cancelEditThread();
        this.refreshPostsThreads();
      }
    });
  }

  cancelEditThread() {
    this.editThreadOn[this.editThreadIndex] = false;
    this.editThreadReply = '';
    this.editThreadId = null;
    this.editThreadIndex = null;
  }


  editClassroom() {
    let dialog = this.dialog.open(EditClassroomDialogComponent, {
      data: this.classroom
    });
    dialog.afterClosed().subscribe((response) => {
      if (response == 'Changed') {
        alert('changed');
        this.classroomChanged.emit(this.classroom.id);
      }
    });
  }
}
