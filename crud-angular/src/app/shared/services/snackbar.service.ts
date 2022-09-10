import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

export enum SnackType {
  SUCCESS = 'success',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  private wrapperTitleModifier = {
    [SnackType.SUCCESS]: () => 'Sucesso',
    [SnackType.ERROR]: () => 'Erro',
  };

  public success(
    message: string,
    title: string = this.wrapperTitleModifier[SnackType.SUCCESS]()
  ) {
    this.openSnackbar(title, message, SnackType.SUCCESS);
  }

  public error(
    message: string,
    title: string = this.wrapperTitleModifier[SnackType.ERROR]()
  ) {
    this.openSnackbar(title, message, SnackType.ERROR);
  }

  public openSnackbar(title: string, message: string, type: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title: title,
        message: message,
      },
      panelClass: ['snack', `snack--${type}`],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
    });
  }
}
