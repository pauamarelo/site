import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    public meta: Meta
  ) {
    meta.addTag({name: 'description', content: 'Title and Meta tags examples'})
    meta.addTag({name: 'viewport', content: 'width=device-width, initial-scale=1'})
  }

  addMetaTags() {
    this.meta.addTags([
       {name: 'robots', content: 'INDEX, FOLLOW'},
       {name: 'author', content: 'ABCD'},
       {name: 'keywords', content: 'Counter-Strike, CSGO, FPS'},
       {name: 'date', content: '2018-06-02', scheme: 'YYYY-MM-DD'},
       {property: 'og:title', content: 'My Text'},
       {property: 'og:description', content: 'My news description'},
       {property: 'og:type', content: 'website'},
       {property: 'og:image', content: 'http://clanpauamarelo.com/assets/img/logo.png'},
       {charset: 'UTF-8'}
    ])
  }

  getMetaTags() {
    let metaEl: HTMLMetaElement = this.meta.getTag('name= "keywords"')
    console.log(metaEl)

    let els: HTMLMetaElement[] = this.meta.getTags('name')
    els.forEach(el => {
      console.log(el)
    })

    let ogs: HTMLMetaElement[] = this.meta.getTags('property')
    ogs.forEach(og => {
      console.log(og)
    })
  }
  
  updateMetaTags(description, date, author, title, img) {
    this.meta.updateTag({name: 'description', content: description})
    this.meta.updateTag({name: 'date', content: date, scheme: 'YYYY-MM-DD'})
    this.meta.updateTag({name: 'author', content: author})
    this.meta.updateTag({property: 'og:title', content: title})
    this.meta.updateTag({property: 'og:description', content: description})
    this.meta.updateTag({property: 'og:type', content: 'website'})
    this.meta.updateTag({property: 'og:image', content: img})
  }
}
