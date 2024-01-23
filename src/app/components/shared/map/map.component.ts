import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule,MapMarker],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  zoom = 18;


  display: any;
  center: google.maps.LatLngLiteral = {
      lat: -16.496983955511457,
      lng: -68.13192532821623
  };


  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  public position = {lat: -16.496983955511457, lng: -68.13192532821623};

  constructor() { }
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) {
        this.center = (event.latLng.toJSON());
        this.markerPositions.push(event.latLng.toJSON());
        console.log(event.latLng.toJSON());
      }
    }

  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

}
