import { Component } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { CardComponent } from '../card/card.component';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CardComponent,LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  properties: any[] = [];
  error: boolean;
  msgError: string;
  loading: boolean;
  constructor(private propertyService: PropertyService) {
    this.error = false;
    this.msgError = '';
    this.loading = false;
    this.properties = [];
  }

  buscar(termino: string) {
    console.log(termino);
    this.loading = true;
    if(termino.length != 0) {
    this.propertyService.getProperty(termino).subscribe((data: any) => {
      console.log(data);
      this.properties = data;
      this.loading = false;
    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
   }else{
      this.loading = false;
      this.properties = [];
   }
  }

}
