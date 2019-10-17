import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faSteam } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-modal-player',
  templateUrl: './modal-player.component.html',
  styleUrls: ['./modal-player.component.scss']
})
export class ModalPlayerComponent implements OnInit {
  public faQuoteLeft = faQuoteLeft
  public faSteam = faSteam

  constructor(
    public dialogRef: MatDialogRef<ModalPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
