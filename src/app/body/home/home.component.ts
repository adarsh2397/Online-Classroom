import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private screenHeight: any;

  constructor() { }

  ngOnInit() {
    this.screenHeight = screen.height*0.80 + 'px';
    console.log(this.screenHeight);
  }

}
