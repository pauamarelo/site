import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public dialog: MatDialog,
    public toast: MatSnackBar
  ) { }

  modal(component, width, dados) {
    this.dialog.open(component, {
      width: width,
      maxWidth: '',
      data: dados
    })
  }

  toaster(component, duration, data) {
    this.toast.openFromComponent(component, {
      duration: duration,
      data: data
    })
  }
}
