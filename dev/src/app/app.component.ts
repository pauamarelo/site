import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { faSteam, faFacebookF, faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { Router, NavigationStart } from '@angular/router';

import * as $ from 'jquery';
import * as M from 'materialize-css';
import { RequestApiService } from './services/request-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  public faSteam = faSteam
  public faFacebook = faFacebookF
  public faYoutube = faYoutube
  public faTwitch = faTwitch

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  public views = 0

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public animateScrollService: NgAnimateScrollService,
    public router: Router,
    public reqService: RequestApiService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.scrollspy');
      var instances = M.ScrollSpy.init(elems, {
        scrollOffset: 80
      });
    })
  }

  ngOnInit() {
    this.router.events.subscribe(ev => {
      if(!(ev instanceof NavigationStart)) {
        $('body').addClass('animated fadeIn')
        if($('body').hasClass('animated fadeIn')) {
          setTimeout(() => {
            $('body').removeClass('animated fadeIn')
          }, 1000)
        }
      }
    })
    
    // views counter
    const seen = sessionStorage['seen'] || false
    if(!seen) {
      this.reqService.getRequest('views').subscribe((data: any) => {
        const response = JSON.parse(data._body)
        this.views = response.data[0].views

        this.reqService.putRequest(`views/${response.data[0]._id}`, {views: this.views+=1}).subscribe((data: any) => {
          console.log(data)
        })
      })
      sessionStorage['seen'] = true
    }
  }

  title = 'PAU AMARELO';
  public hoje = new Date().getFullYear()

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  scrollToSection(id) {
    // this.animateScrollService.scrollToElement(id, 400)
    if(window.location.pathname === '/') {
      $(document).ready(function() {
        $('html, body').animate({
          scrollTop: $(id).offset().top - 60
        }, 300)
      })
    } else {
      this.router.navigate(['/'])
      setTimeout(() => {
        $(document).ready(function() {
          $('html, body').animate({
            scrollTop: $(id).offset().top - 60
          }, 300)
        })
      }, 300)
    }
  }
}
