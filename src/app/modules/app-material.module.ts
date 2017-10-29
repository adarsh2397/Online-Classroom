import { NgModule } from '@angular/core';
import {MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule, MdDatepickerModule, MdNativeDateModule, MdExpansionModule } from '@angular/material';

@NgModule({
  imports: [MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule, MdDatepickerModule, MdNativeDateModule, MdExpansionModule],
  exports: [MdSelectModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule, MdDatepickerModule, MdNativeDateModule, MdExpansionModule],
})
export class AppMaterialModule { }