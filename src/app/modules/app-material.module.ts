import { NgModule } from '@angular/core';
import {MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule],
  exports: [MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule],
})
export class AppMaterialModule { }