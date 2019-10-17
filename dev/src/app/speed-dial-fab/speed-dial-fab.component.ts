import { Component, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { faTwitter, faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { NoticiaComponent } from '../noticia/noticia.component';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from '../services/request-api.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent extends NoticiaComponent implements OnInit {
  public whatsappColor = '#25d366'
  public facebookColor = '#3b5998'
  public twitterColor = '#1da1f2'
  public url = ''
  public titulo = ''

  fabButtons = [
    {
      icon: faWhatsapp,
      style: this.whatsappColor,
      handler: () => {
        window.open(`https://api.whatsapp.com/send?text=${this.titulo} http://clanpauamarelo.com/noticia/${this.url}`, '_blank')
      }
    },
    {
      icon: faFacebookF,
      style: this.facebookColor,
      handler: () => {
        alert('Ainda não ta pronto newba! xD')
      }
    },
    {
      icon: faTwitter,
      style: this.twitterColor,
      handler: () => {
        alert('Ninguém usa twitter n00b -_-')
      }
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  constructor(
    public route: ActivatedRoute,
    public reqService: RequestApiService,
    public meta: Meta,
    public title: Title
  ) {
    super(route, reqService, meta, title)
    this.route.params.subscribe(data => {
      this.url = data.url
    })
  }

  ngOnInit() {
    this.listarNoticia()
  }

  async listarNoticia() {
    await this.reqService.getRequest('news').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      if(response.status) {
        this.titulo = response.data.filter(res => res.url === this.url)[0].titulo
      }
    })
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

}
