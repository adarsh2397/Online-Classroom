import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private firstname;
  private lastname;
  private username;
  private password;
  private city;
  private house;
  private pincode;
  private email;
  private phone;
  private type;

  constructor(
    private loginService: LoginService,
    private snackbar: MdSnackBar,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submitForm() {
    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      city: this.city,
      house: this.house,
      pincode: this.pincode,
      phone: this.phone,
      email: this.email,
      type: this.type
    }

    this.loginService.registerUser(data)
      .subscribe((response) => {
        if (response['_body'] == 'Failure') {
          this.snackbar.open('Registration Failed','',{
            duration: 3000
          });
        } else {
          let snackbar = this.snackbar.open('Register Success', '', {
            duration: 3000
          });
          snackbar.afterDismissed().subscribe(() => {
            this.loginUser();
          });
        }
      });
  }

  loginUser() {
    const data = {
      username: this.username,
      password: this.password
    }
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
              if (this.userService.profileUpdated == true) {
                this.router.navigate(['workspace']);
              } else {
                this.router.navigate(['dashboard']);
              }
            });
          }
        }
      });
  }

}
