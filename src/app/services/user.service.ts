import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { UtilityService } from './utility.service';

@Injectable()
export class UserService {

  private serverUrl = 'http://localhost:3000/';

  private userID: number;
  private userType: string;

  public profileUpdated: boolean;
  public loggedIn = false;

  public userDetails: any;

  public userLoaded = new BehaviorSubject<any>(null);

  constructor(
    private http: Http,
    private utilityService: UtilityService
  ) { 
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    if (localStorage.getItem('user_id') && localStorage.getItem('user_type')) {
      this.setUserDetails(parseInt(localStorage.getItem('user_id')),localStorage.getItem('user_type'));
    }
  }

  logout() {
    this.setUserID(null);
    this.setUserType(null);
    this.loggedIn = false;
    this.profileUpdated = false;
    this.userDetails = null;
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_type');
  }

  getUserType() {
    return this.userType;
  }

  getUserID() {
    return this.userID;
  }

  setUserType(type: string) {
    this.userType = type;
  }

  setUserID(id: number) {
    this.userID = id;
    this.loggedIn = true;
  }

  setUserDetails(id: number, type: string) {
    const data = {
      id: id,
      type: type
    }
    this.setUserID(data.id);
    this.setUserType(data.type);
    this.getUserDetails(data);
  }

  getUserDetails(data) {
    const specificUrl = this.serverUrl + 'user/get-user-details';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    let responseData =  this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError)
          .subscribe((response) => {
            console.log(response);
        if (response['_body'] == 'Failure') {
          alert('Unable to Get User Details');
        } else {
          let res = JSON.parse(response['_body']);
          console.log(res);
          this.userDetails = res.details[0];
          this.profileUpdated = res.profileUpdate;
          localStorage.setItem('user_id', data.id);
          localStorage.setItem('user_type', data.type);
          this.userLoaded.next(this.userDetails);
        }
      });
    
    return responseData;
  }

  saveProfile(data) {
    const specificUrl = this.serverUrl + 'user/update-user-details';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  createClassroom(data) {
    const specificUrl = this.serverUrl + 'user/create-classroom';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  searchClassroom(data) {
    const specificUrl = this.serverUrl + 'user/search-course-code';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  joinClassroom(data) {
    let specificUrl = this.serverUrl + 'user/join-classroom';
    if (this.getUserType() == 'Student') {
      specificUrl = this.serverUrl + 'user/join-classroom';
    } else if (this.getUserType() == 'Teacher') {
      specificUrl = this.serverUrl + 'user/join-classroom-teacher';
    }
    
    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  getClassrooms(data) {
    const specificUrl = this.serverUrl + 'user/get-classrooms';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  getPosts(data) {
    const specificUrl = this.serverUrl + 'user/get-posts';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  getThreads(data) {
    const specificUrl = this.serverUrl + 'user/get-threads';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  getResources(data) {
    const specificUrl = this.serverUrl + 'user/get-resources';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  getClassroomInfo(data) {
    const specificUrl = this.serverUrl + 'user/get-classroom-info';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  createPost(data) {
    const specificUrl = this.serverUrl + 'user/create-post';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  createThread(data) {
    const specificUrl = this.serverUrl + 'user/create-thread';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  deletePost(data) {
    const specificUrl = this.serverUrl + 'user/delete-post';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  deleteThread(data) {
    const specificUrl = this.serverUrl + 'user/delete-thread';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  addResource(data) {
    const specificUrl = this.serverUrl + 'user/add-resource';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  deleteResource(data) {
    const specificUrl = this.serverUrl + 'user/delete-resource';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  leaveClassroom(data) {
    const specificUrl = this.serverUrl + 'user/leave-classroom';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  uploadImage(formData) {
    const specificUrl = this.serverUrl + 'user/upload-image';

    return this.http.post(specificUrl, formData)
      .map(this.utilityService.extractData)
      .catch(this.utilityService.handleError);
  }

  changeProfilePicture(data) {
    const specificUrl = this.serverUrl + 'user/change-profile-pic';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  changePassword(data) {
    const specificUrl = this.serverUrl + 'user/change-password';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  updatePost(data) {
    const specificUrl = this.serverUrl + 'user/update-post';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  updateThread(data) {
    const specificUrl = this.serverUrl + 'user/update-thread';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  adminLeaveClassroom(data) {
    const specificUrl = this.serverUrl + 'user/admin-leave-classroom';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  updateClassroom(data) {
    const specificUrl = this.serverUrl + 'user/update-classroom';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }
}
