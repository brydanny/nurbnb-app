import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // Importar desde la ruta correcta

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private static apiGateway = environment.apiGateway;
  static apiGatewayUrl = environment.apiGatewayUrl;
  private static apiUrls: { [key: string]: string } = environment.apiUrls;


  static getUrlByKey(key: string): string {
    if (this.apiGateway) {
      return `${this.apiGatewayUrl}`;
    } else
    if (this.apiUrls.hasOwnProperty(key)) {
      return this.apiUrls[key];
    } else {
      console.error(`Key "${key}" no encontrada en environment.apiUrls.`);
      return `${this.apiGatewayUrl}`;
    }
  }
}
