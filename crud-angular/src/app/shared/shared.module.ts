import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MaterialModule } from './modules/material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
  CommonModule,
    MaterialModule
  ],
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    SnackbarComponent,
    ConfirmDialogComponent
  ],
  exports: [
    MaterialModule,
    ErrorDialogComponent,
    CategoryPipe,
    SnackbarComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
