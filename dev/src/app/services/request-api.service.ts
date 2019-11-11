import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {
  
  public urlBase = 'https://pauamarelo.herokuapp.com/oapi'
  // public urlBase = 'http://localhost:4000/oapi'

  constructor(public http: Http) { }

  getJson(json) {
    return this.http.get(`assets/data/${json}`)
  }

  getRequest(url) {
    return this.http.get(`${this.urlBase}/${url}`)
  }

  postRequest(url, dados) {
    return this.http.post(`${this.urlBase}/${url}`, dados)
  }

  putRequest(url, dados) {
    return this.http.put(`${this.urlBase}/${url}`, dados)
  }
}
