import { BookingService } from './../../services/booking.service';
import { Component } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { UserService } from '../../services/user.service';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { Router } from '@angular/router';



@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [LoadingComponent,NoimagePipe,DateFormatPipe],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  bookings: any
  loading: boolean;
  error: boolean;
  msgError: string;
  idUser: string;
  isGuest: boolean;
  isHost: boolean;
  // formattedDate: string;


  constructor(private bookingService: BookingService,
              private userService: UserService,
              private router: Router
             )
  {
    this.loading = true;
    this.error = false;
    this.msgError = '';
    this.idUser = '';
    this.isGuest = this.userService.getIsGuest();
    this.isHost = this.userService.getIsHost();

    if(!this.userService.isLogged()){
      this.error = true;
      this.msgError = 'No hay un usuario logueado';
      this.loading = false;
      return;
    }
    if(this.isGuest){
      this.idUser = this.userService.getIdGuest();
    } else if(this.isHost){
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

  confirmBooking(id:string){
    console.log('BookingListComponent- CONFIRM BOOKING' + id  );
    this.bookingService.confirmBooking(id).subscribe((data: any) => {
      console.log('BookingListComponent- BOOKINGS');
      console.log(data);
      //this.bookings = data;
      this.loading = false;
      //this.router.navigate(['/booking-list']);
      this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/booking-list']);
    });

    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
  }


}
