import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  nameService : string = 'booking';

  constructor(private httpService: HttpService) {
    console.log('Booking service listo');
   }

  createHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('token-nurbnb')}`
    };
  }

  reserve(booking:any){
    return this.httpService.post('booking',booking,this.nameService, this.createHeaders());
   }
}


