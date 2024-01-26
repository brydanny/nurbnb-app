import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  formulario: FormGroup;
  booking: Booking;
  error: boolean;
  msgError: string;
  loading: boolean;

  constructor(private bookingService: BookingService) {

    this.error = false;
    this.msgError = '';
    this.loading = true;
    this.formulario = new FormGroup({
      checkInDate: new FormControl(),
      checkOutDate: new FormControl(),
      numberOfGuests: new FormControl(),

    });
    this.booking = this.formulario.value;

  }
  onSubmit() {
    this.loading = true;
    console.log("form submit");
    console.log(this.formulario.value);
    this.booking = this.formulario.value;
    this.booking.propertyId = "65afd710f28f3b838a093d3e";
    this.booking.guest = "65afcf8c81076cd42f927090";
    this.booking.numberOfGuests = 2;
    this.booking.checkInDate = "2023-08-07";
    this.booking.checkOutDate = "2023-08-10";
    console.log(this.booking);

    this.bookingService.reserve(this.booking).subscribe((data: any) => {
      console.log(data);
      this.loading = false;
    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
  }

}
