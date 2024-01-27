import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  nameService : string = 'booking';

  constructor(private httpService: HttpService,
              private userService: UserService) {
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

  getBookings(id:string){
      if(this.userService.getIsGuest()){
        return this.httpService.get(`booking/trips/${id}`,this.nameService, this.createHeaders());
      } else if(this.userService.getIsHost()){
        return this.httpService.get(`booking/hosting/${id}`,this.nameService, this.createHeaders());
      }
      return this.httpService.get('booking',this.nameService, this.createHeaders());
  }
  confirmBooking(id:string){
    return this.httpService.post(`booking/${id}/confirm`,null,this.nameService, this.createHeaders());
  }

}


