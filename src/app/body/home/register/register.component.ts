import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { LoginService } from '../../../services/login.service';


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
    private snackbar: MdSnackBar
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
          this.snackbar.open('Register Success', '', {
            duration: 3000
          });
        }
      });
  }

}
