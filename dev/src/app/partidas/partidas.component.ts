import { Component, OnInit } from '@angular/core';
import { RequestApiService } from '../services/request-api.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent implements OnInit {
  public partidas = []
  public loader: Boolean = false
  public bg = ''

  background = (bg) => `url('../../assets/img/maps/${bg}.jpg')`

  constructor(
    public reqService: RequestApiService,
    public meta: Meta,
    public title: Title
  ) { }

  ngOnInit() {
    this.listar()
    this.meta.updateTag({
      name: 'Partidas',
      content: 'Só a nata das partidas da clã'
    })
    this.title.setTitle('Partidas | PAU AMARELO')
  }

  async listar() {
    this.loader = true
    await this.reqService.getRequest('partidas').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      if(response.status) {
        this.loader = false
        this.partidas = response.data
      } else {
        this.loader = false
      }
    }, error => {
      this.loader = false
    })
  }

}
