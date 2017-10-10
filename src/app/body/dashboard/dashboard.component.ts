import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userDetails: any;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { this.openDialog(); }
    openDialog(): void {
      let dialogRef = this.dialog.open(EditProfileComponent, {
        width: '300px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  

  ngOnInit() {
    this.userService.userLoaded.subscribe((details) => {
      this.userDetails = details;
    });
  }

}


@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.html',
})
export class EditProfileComponent {

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
