import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private screenHeight: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
    if (this.userService.loggedIn == true) {
      this.router.navigate(['workspace']);
    }
  }

  ngOnInit() {
    this.screenHeight = screen.height*0.80 + 'px';
    console.log(this.screenHeight);
  }

}
