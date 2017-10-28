import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private name: string;
  private profilepic: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.userLoaded.subscribe((userDetails) => {
      if (userDetails) {
        this.name = userDetails.firstname + ' ' + userDetails.lastname;
        this.profilepic = userDetails.profilepic;
      }
    });
  }

  logout() {
    this.userService.logout();
    location.href = 'localhost:4200';
  }

}
