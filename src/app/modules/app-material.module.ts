import { NgModule } from '@angular/core';
import {MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

@NgModule({
  imports: [MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule, MdDatepickerModule, MdNativeDateModule],
  exports: [MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule, MdDatepickerModule, MdNativeDateModule],
})
export class AppMaterialModule { }