import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RequestApiService } from '../services/request-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  public noticias = []
  public loader: Boolean = false
  public errorMsg = ''
  public img = ''

  public textFilter: String = ''
  public autorFilter: String = ''

  constructor(
    public meta: Meta,
    public title: Title,
    public reqService: RequestApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.meta.updateTag({
      name: 'Notícias',
      content: 'Só a nata das notícias'
    })
    this.title.setTitle('Notícias | PAU AMARELO')
    this.listar()
  }

  async listar() {
    this.loader = true
    await this.reqService.getRequest('news').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      if(response.status) {
        this.noticias = response.data.filter(res => res.ativo === true)
        this.loader = false
      } else {
        this.loader = false
      }
    }, error => {
      this.loader = false
      this.errorMsg = 'Houve um erro no carregamento, por favor <a href="/noticias">recarregue a página</a>.'
    })
  }

  public dados
  openNews(dados) {
    this.router.navigate(['/noticia', dados.url])
  }

}
