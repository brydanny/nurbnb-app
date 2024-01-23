import { Component,Input } from '@angular/core';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { CurrencyPipe } from '@angular/common';
import { LoadingComponent } from '../shared/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe,NoimagePipe,LoadingComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() items: any [] = [];

  constructor(private router: Router) {
    console.log(this.items);
  }

  verPropiedad(property: any) {
    console.log(property);
    this.router.navigate(['/property', property._id]);
  }

}
