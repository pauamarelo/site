import { Component, OnInit } from '@angular/core';
import { RequestApiService } from 'src/app/services/request-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faSteam } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-modal-ex',
  templateUrl: './modal-ex.component.html',
  styleUrls: ['./modal-ex.component.scss']
})
export class ModalExComponent implements OnInit {
  public faSteam = faSteam
  
  public exIntegrantes = []

  constructor(
    public reqService: RequestApiService,
    public dialogRef: MatDialogRef<ModalExComponent>
  ) { }

  ngOnInit() {
    this.listar()
  }

  async listar() {
    await this.reqService.getRequest('integrantes').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      if(response.status) {
        this.exIntegrantes = response.data.filter(res => res.exIntegrante === true)
      }
    })
  }

  close(): void {
    this.dialogRef.close();
  }

}
