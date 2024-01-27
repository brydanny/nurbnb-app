import { Component, Input,OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from '../shared/loading/loading.component';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule,LoadingComponent],
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
  exito: boolean;

  constructor(private bookingService: BookingService,
              private userService: UserService) {

    this.error = false;
    this.exito = false;
    this.msgError = '';
    this.loading = true;
    this.formulario = new FormGroup({
      checkInDate: new FormControl('', Validators.required),
      checkOutDate: new FormControl('', Validators.required),
      numberOfGuests: new FormControl('', Validators.required),

    });
    this.booking = this.formulario.value;
    this.loading = false;

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
    this.error = false;
    this.exito = false;
    this.msgError = '';
    if (!this.formulario.valid) {
      this.error = true;
      this.msgError = 'Todos los elementos son requeridos';
      this.loading = false;
      return;
    }
    //console.log("form submit");
    //console.log(this.formulario.value);
    this.booking = this.formulario.value;
    this.booking.propertyId = this.propertyId;
    this.booking.guest = this.userService.getIdGuest();
    this.booking.numberOfGuests = this.convertirANumero(this.formulario.value.numberOfGuests);
    //console.log('BookingComponent-propertyId: '+ this.booking.propertyId);
    console.log(this.booking);
    this.bookingService.reserve(this.booking).subscribe((data: any) => {
      console.log('BookingComponent- RESERVE');
      console.log(data);
      this.loading = false;
      if(data.statusCode == 400 || data.statusCode == 401){
        this.error = true;
        this.msgError = data.message;
        //this.loading = false;
        return;
      }
      this.exito = true;
      this.msgError = 'Reserva realizada con éxito';

    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
  }

}
