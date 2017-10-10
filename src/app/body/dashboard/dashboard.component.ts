import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userDetails: any;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.userLoaded.subscribe((details) => {
      this.userDetails = details;
    });
  }

}
