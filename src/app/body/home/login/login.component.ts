import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username: string = '';
  private password: string = '';

  private loggingIn = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private snackbar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginUser() {
    const data = {
      username: this.username,
      password: this.password
    }
    this.loggingIn = true;
    this.loginService.loginUser(data)
      .subscribe((response) => {
        if (response['_body'] == 'Invalid') {
          this.snackbar.open('Invalid Username and Password', '',{
            duration: 3000
          });
        } else if (response['_body'] == 'Failure') {
          this.snackbar.open('Server Failed', '',{
            duration: 3000
          });
        } else {
          console.log(response);
          response = JSON.parse(response['_body']);
          if (response.Status == 'Success') { 
            this.snackbar.open('Login Success', '',{
              duration: 3000
            });
            this.userService.setUserDetails(response.ID, response.Type);
            this.userService.userLoaded.subscribe(() => {
              if (this.userService.profileUpdated == true && this.loggingIn) {
                this.loggingIn = false;
                this.router.navigate(['workspace']);
              } else if (this.userService.profileUpdated == false) {
                this.loggingIn = false;
                this.router.navigate(['dashboard']);
              } else if (this.loggingIn == true) {
                this.loggingIn = false;
                this.router.navigate(['workspace']);
              }
            });
          }
        }
      });
  }

}
