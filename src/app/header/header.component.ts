import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
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
    location.reload();
  }

  routeCreateClassroom() {
    this.router.navigate(['create-classroom']);
  }

  routeJoinClassroom() {
    this.router.navigate(['join-classroom']);
  }
}
