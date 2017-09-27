import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule],
  exports: [MdButtonModule, MdCheckboxModule, MdCardModule, MdFormFieldModule, MdInputModule, MdTabsModule, MdRadioModule, MdDialogModule],
})
export class AppMaterialModule { }