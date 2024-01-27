import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL = `http://localhost:3000/`;
  /*
   TOKEN = 'BQAzpO6uDXPGswcszvp6TOwQbXP4l1sh1TRSqqn7t9QH-ICucWIWIUX34bu2GQpArBcLyvADvHIxGLbUDxqJ2A65_BTznnJHnvo5MOetNdYl5LDT71Q';
   HEADERS = new HttpHeaders({
    'Authorization': `Bearer ${this.TOKEN}`
  }); */
  HEADERS = new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  });
  constructor(private http: HttpClient) { }

  public get(endpoint: string, nameService :string = '', header?:any):any {
    const url = `${UrlService.getUrlByKey(nameService)}${endpoint}`;
    return this.httpRequest('GET', url,null,header);
   }

   public post(endpoint: string, data: any, nameService :string = '', header?:any):any {
    const url = `${UrlService.getUrlByKey(nameService)}${endpoint}`;
    console.log('url');
    console.log(header);
    return this.httpRequest('POST', url, data,header);
   }

  private httpRequest( method: string, url: string, data = null, header = null) {
    console.log('Http service listo');
    const headers: HttpHeaders = header ? header : new HttpHeaders();
    console.log(data);
    const option = {
      body: data,
      headers: headers
    }
    console.log(url);
    console.log(option);
    try{
      //headers.set('Authorization', `Bearer ${this.TOKEN}`);
      return this.http.request(method, url, option);
    }
    catch(error:any){
      console.log(error);
      console.log(`Se tiene problemas en le request ${method} en el endpoint: ${url}`);
      if (error.response && error.response.status === 401) {  // Unauthorized error
        return error.message;
      }

      return error.message;
    }

   }



}
