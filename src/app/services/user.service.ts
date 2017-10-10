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

  public userDetails: string;

  public userLoaded = new BehaviorSubject<any>(null);

  constructor(
    private http: Http,
    private utilityService: UtilityService
  ) { }

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
  }

  setUserDetails(id: number, type: string) {
    const data = {
      id: id,
      type: type
    }
    this.getUserDetails(data)
      .subscribe((response) => {
        if (response['_body'] == 'Failure') {
          alert('Unable to Get User Details');
        } else {
          console.log(response);
          this.userDetails = JSON.parse(response['_body'])[0];
          console.log(this.userDetails);
          this.userLoaded.next(this.userDetails);
        }
      });
  }

  getUserDetails(data) {
    const specificUrl = this.serverUrl + 'user/get-user-details';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

}
