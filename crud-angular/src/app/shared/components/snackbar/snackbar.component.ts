import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
        public data: {
          title: string;
          message: string;
        },
        private _snackRef: MatSnackBarRef<SnackbarComponent>
  ) { }

  close() {
    this._snackRef.dismiss();
  }
}
