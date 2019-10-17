import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-foto',
  templateUrl: './modal-foto.component.html',
  styleUrls: ['./modal-foto.component.scss']
})
export class ModalFotoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalFotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close()
  }

}
