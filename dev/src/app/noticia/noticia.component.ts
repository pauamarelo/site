import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from '../services/request-api.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit {
  public url: String = ''
  public noticia: any = {}
  public loader: Boolean = false
  public errorMsg = ''
  public img = ''

  constructor(
    public route: ActivatedRoute,
    public reqService: RequestApiService,
    public meta: Meta,
    public title: Title,
  ) {
    this.route.params.subscribe(data => {
      this.url = data.url
    })
  }

  ngOnInit() {
    this.listar()
  }

  async listar() {
    this.loader = true
    await this.reqService.getRequest('news').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      if(response.status) {
        this.loader = false
        this.noticia = response.data.filter(res => res.url === this.url)[0]
        this.img = `url(${this.noticia.img})`

        // Meta
        this.meta.updateTag({
          name: 'PAU AMARELO',
          content: this.noticia.titulo
        })
        this.title.setTitle(this.noticia.titulo)
      } else {
        this.loader = false
      }
    }, error => {
      this.loader = false
      this.errorMsg = 'Houve um erro no carregamento, por favor <a href="/noticias">recarregue a página</a>.'
    })
  }

}
