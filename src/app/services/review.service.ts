import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  nameService : string = 'review';

  constructor(private httpService: HttpService) {
    console.log('Review service listo');
   }
   getReviewsByPropertyId(id: string) {
    console.log('getReviewsByPropertyId' + id);
    return this.httpService.get(`review/?filter=${id}`,this.nameService).pipe( map( (data: any) =>  data  ));
   }
}
