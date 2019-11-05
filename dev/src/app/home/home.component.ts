import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestApiService } from '../services/request-api.service';
import { ModalPlayerComponent } from '../modals/modal-player/modal-player.component';
import { ModalExComponent } from '../modals/modal-ex/modal-ex.component';
import { UtilsService } from '../services/utils.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastComponent } from '../toast/toast.component';
import { Meta, Title } from '@angular/platform-browser';
import { ParallaxConfig } from 'ngx-parallax'
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup

  public integrantes = []
  public loader: Boolean = false
  public loaderEmail: Boolean = false
  public mapa = []
  public requisitos = []
  public patentes = []
  
  public isSmallScreen: Boolean = false
  public parallaxConfig: ParallaxConfig = {
    ratio: .1
  }

  constructor(
    public reqService: RequestApiService,
    public utils: UtilsService,
    public meta: Meta,
    public title: Title,
    breakpointObserver: BreakpointObserver,
  ) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.minLength(3), Validators.required]),
      idade: new FormControl('', [Validators.maxLength(2), Validators.min(18), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      patente: new FormControl('', Validators.required),
      mensagem: new FormControl('', [Validators.minLength(10), Validators.maxLength(1000), Validators.required])
    })
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 767px)')
    if(this.isSmallScreen) {
      this.parallaxConfig.ratio = 0
    }
  }

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize

  ngOnInit() {
    this.meta.updateTag({
      name: 'description',
      content: 'O Maior Clan da Parte Sul/Sudeste do Brasil'
    })
    this.meta.updateTag({
      property: 'og:image',
      content: 'http://clanpauamarelo.com/assets/img/logo.png'
    })
    this.title.setTitle('PAU AMARELO | O Maior Clan da Parte Sul/Sudeste do Brasil')
    this.listar()
    this.listarMapa()
    this.listarRequisitos()
    this.listarPatentes()
  }

  async listar() {
    this.loader = true
    await this.reqService.getRequest('integrantes').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      if(response.status) {
        this.integrantes = response.data.filter(res => res.ativo === true && res.exIntegrante === false)
        this.loader = false
      } else {
        this.loader = false
      }
    }, error => {
      console.log('erro', error)
    })
  }

  modalPlayers(dados) {
    this.utils.modal(ModalPlayerComponent, '760px', dados)
  }

  modalExPlayers() {
    this.utils.modal(ModalExComponent, '760px', '')
  }

  listarMapa() {
    this.reqService.getJson('mapa.json').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      this.mapa = response.lista
    })
  }

  listarRequisitos() {
    this.reqService.getJson('requisitos.json').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      this.requisitos = response.lista
    })
  }

  listarPatentes() {
    this.reqService.getJson('patentes.json').subscribe(data => {
      const dados = (data as any)
      const response = JSON.parse(dados._body)
      this.patentes = response.lista
    })
  }

  enviar() {
    this.loaderEmail = true
    if(this.form.valid) {
      this.reqService.postRequest('send-mail', this.form.value).subscribe(data => {
        const dados = (data as any)
        const response = JSON.parse(dados._body)
        if(response.status) {
          this.utils.toaster(ToastComponent, 4000, {message: response.msg})
          this.form.reset()
          this.loaderEmail = false
        } else {
          this.utils.toaster(ToastComponent, 4000, {message: response.msg})
          this.loaderEmail = false
        }
      })
    } else {
      this.utils.toaster(ToastComponent, 4000, {message: 'Preencha todos os campos corretamente'})
      this.loaderEmail = false
    }
  }

}