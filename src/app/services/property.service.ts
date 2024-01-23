import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  nameService : string = 'property';

  constructor(private httpService: HttpService) {
    console.log('Property service listo');
   }

   getProperties() {
    return this.httpService.get('property',this.nameService).pipe( map( (data: any) =>  data  ));
   }

   getProperty(termino: string) {

    return this.httpService.get(`property?filter=${termino}`,this.nameService).pipe( map( (data: any) =>  data  ));

   }
   getPropertyById(id: string) {
    return this.httpService.get(`property/${id}`,this.nameService).pipe( map( (data: any) =>  data  ));
   }
}
