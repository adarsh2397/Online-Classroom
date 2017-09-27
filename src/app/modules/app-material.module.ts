import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule],
  exports: [MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule, MdSnackBarModule],
})
export class AppMaterialModule { }