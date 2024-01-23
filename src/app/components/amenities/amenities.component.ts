import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent {
  @Input() items: string [] = [];
  constructor() {
    console.log(this.items);
  }
}
