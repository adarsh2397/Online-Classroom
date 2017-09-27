import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { UtilityService } from './utility.service';

@Injectable()
export class LoginService {

  private serverUrl = 'http://localhost:3000/';

  constructor(
    private http: Http,
    private utilityService: UtilityService
  ) { }
  
  registerUser(data) {
    const specificUrl = this.serverUrl + 'register-user';

    const headers = new Headers({'Content-Type':'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

}
