import { Component } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { CurrencyPipe } from '@angular/common';
import { LoadingComponent } from '../shared/loading/loading.component';
import { AmenitiesComponent } from '../amenities/amenities.component';
import { ReviewsPropComponent } from '../reviews-prop/reviews-prop.component';
import { MapComponent } from '../shared/map/map.component';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [CurrencyPipe,NoimagePipe,LoadingComponent,AmenitiesComponent,ReviewsPropComponent,MapComponent,BookingComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {
  property: any = {};
  error: boolean;
  msgError: string;
  loading: boolean;
  constructor(private router: ActivatedRoute,
              private propertyService: PropertyService,
              private routerLink: Router
              )
  {
    this.error = false;
    this.msgError = '';
    this.loading = true;
    this.router.params.subscribe(params => {
      console.log(params['id']);
      this.getDetailProperty(params['id']);
    });
  }
  getDetailProperty(id: string) {
    this.loading = true;
    this.propertyService.getPropertyById(id).subscribe((data: any) => {
      console.log(data);
      this.property = data;
      console.log(this.property.amenities);
      this.loading = false;
    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
  }
  returnHome() {
    this.routerLink.navigate(['/home']);
  }

}
