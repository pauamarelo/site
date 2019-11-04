import { Component, OnInit } from '@angular/core';
import { RequestApiService } from '../services/request-api.service';
import { ModalFotoComponent } from '../modals/modal-foto/modal-foto.component';
import { MatDialog } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  public galeria = []
  public integrantes = []
  public loader: Boolean = false
  public playerActive = ''

  constructor(
    public reqService: RequestApiService,
    public dialog: MatDialog,
    public meta: Meta,
    public title: Title
  ) { }

  ngOnInit() {
    this.meta.updateTag({
      name: 'Galeria',
      content: 'Só a nata das fotos paunianas'
    })
    this.title.setTitle('Galeria | PAU AMARELO')
    this.listar()
    this.listarIntegrantes()
  }

  async listar() {
    this.galeria = []
    this.loader = true
    await this.reqService.getRequest('galeria').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      if(response.status) {
        this.galeria = response.data
        this.loader = false
      } else {
        this.loader = false
      }
    }, error => {
      this.loader = false
    })
  }

  async listarIntegrantes() {
    await this.reqService.getRequest('integrantes').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      if(response.status) {
        this.integrantes = response.data
      }
    })
  }

  openPic(val) {
    this.dialog.open(ModalFotoComponent, {
      width: '',
      maxWidth: '',
      data: val,
      backdropClass: 'modal-foto-bg',
      panelClass: 'modal-foto-panel'
    })
  }

  filtrarGaleria(obj) {
    this.playerActive = obj.nick
    if(!obj) {
      this.listar()
    }
  }

}
