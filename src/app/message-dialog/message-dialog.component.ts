import { Component, Inject   } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {

  constructor(
    public dialogRef: MdDialogRef<MessageDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

}
