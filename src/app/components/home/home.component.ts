import { Component } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { CardComponent } from '../card/card.component';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent,LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  properties: any[] = [];
  loading: boolean;
  error: boolean;
  msgError: string;

  constructor(private propertyService: PropertyService)
  {
    this.loading = true;
    this.error = false;
    this.msgError = '';
    this.propertyService.getProperties().subscribe((data: any) => {
      console.log('HomeComponent- PROPERTIES');
      console.log(data);
      this.properties = data;
      this.loading = false;
    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
  }
}
