import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MaterialModule } from './modules/material.module';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    SnackbarComponent
  ],
  exports: [
    MaterialModule,
    ErrorDialogComponent,
    CategoryPipe,
    SnackbarComponent
  ]
})
export class SharedModule { }
