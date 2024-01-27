import { BookingService } from './../../services/booking.service';
import { Component } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [LoadingComponent,NoimagePipe],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  bookings: any
  loading: boolean;
  error: boolean;
  msgError: string;
  idUser: string;


  constructor(private bookingService: BookingService,
              private userService: UserService
             )
  {
    this.loading = true;
    this.error = false;
    this.msgError = '';
    this.idUser = '';

    if(!this.userService.isLogged()){
      this.error = true;
      this.msgError = 'No hay un usuario logueado';
      this.loading = false;
      return;
    }
    if(this.userService.getIsGuest()){
      this.idUser = this.userService.getIdGuest();
    } else if(this.userService.getIsHost()){
      this.idUser = this.userService.getIdHost();
    }
    console.log('BookingListComponent- IDUSER' + this.idUser);

    this.bookingService.getBookings(this.idUser).subscribe((data: any) => {
      console.log('BookingListComponent- BOOKINGS');
      console.log(data);
      this.bookings = data;
      this.loading = false;
    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });

  }


}
