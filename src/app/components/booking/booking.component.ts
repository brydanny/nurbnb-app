import { Component, Input,OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  @Input() propertyId: string = '';

  formulario: FormGroup;
  booking: Booking;
  error: boolean;
  msgError: string;
  loading: boolean;
  maxDate?: string;

  constructor(private bookingService: BookingService,
              private userService: UserService) {

    this.error = false;
    this.msgError = '';
    this.loading = true;
    this.formulario = new FormGroup({
      checkInDate: new FormControl(),
      checkOutDate: new FormControl(),
      numberOfGuests: new FormControl(),

    });
    this.booking = this.formulario.value;
    /* const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; */

  }
  ngOnInit(): void {
    console.log('BookingComponent: '+ this.propertyId);
    this.booking.propertyId = this.propertyId;
    //this.getReviewsByPropertyId(this.propertyId);
  }


  convertirANumero(valor: string):number {
    // Convertir el valor a número utilizando parseInt o parseFloat
    return parseFloat(valor);
    // O puedes usar parseInt(valor, 10) para obtener un número entero
  }
  onSubmit() {
    this.loading = true;
    console.log("form submit");
    console.log(this.formulario.value);
    this.booking = this.formulario.value;
    //this.booking.propertyId = "65afd7109e2a46195b4d9256";
    this.booking.propertyId = this.propertyId;
    //this.booking.guest = "65afcf8c81076cd42f927090";
    this.booking.guest = this.userService.getIdGuest();
    this.booking.numberOfGuests = this.convertirANumero(this.formulario.value.numberOfGuests);
    console.log('BookingComponent-propertyId: '+ this.booking.propertyId);
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
