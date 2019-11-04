import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParallaxModule, ParallaxConfig } from 'ngx-parallax';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { ScrollSpyModule } from '@thisissoon/angular-scrollspy';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgPipesModule } from 'ng-pipes';
import { DisqusModule } from "ngx-disqus";

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

import { NoticiasComponent } from './noticias/noticias.component';
import { HomeComponent } from './home/home.component';
import { ModalPlayerComponent } from './modals/modal-player/modal-player.component';
import { ModalExComponent } from './modals/modal-ex/modal-ex.component';
import { ToastComponent } from './toast/toast.component';
import { ScrollSpyDirective } from './directives/scroll-spy.directive';
import { GaleriaComponent } from './galeria/galeria.component';
import { ModalFotoComponent } from './modals/modal-foto/modal-foto.component';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { NoticiaComponent } from './noticia/noticia.component';
import { SafePipe } from './pipes/safe.pipe';
import { SpeedDialFabComponent } from './speed-dial-fab/speed-dial-fab.component';
import { PartidasComponent } from './partidas/partidas.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticiasComponent,
    HomeComponent,
    ModalPlayerComponent,
    ModalExComponent,
    ToastComponent,
    ScrollSpyDirective,
    GaleriaComponent,
    ModalFotoComponent,
    FilterPipe,
    OrderByPipe,
    NoticiaComponent,
    SafePipe,
    SpeedDialFabComponent,
    PartidasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    HttpModule,
    ParallaxModule,
    FontAwesomeModule,
    MatCarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    InViewportModule,
    ScrollSpyModule.forRoot(),
    NgxMasonryModule,
    NgPipesModule,
    DisqusModule.forRoot('pauamarelo-1')
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalPlayerComponent,
    ModalExComponent,
    ToastComponent,
    ModalFotoComponent
  ]
})
export class AppModule { }
