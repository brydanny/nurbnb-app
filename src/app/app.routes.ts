import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { PropertyComponent } from './components/property/property.component';

export const routes: Routes = [
  { path: 'home',
   loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
   { path: 'search', component: SearchComponent },
   { path: 'property/:id', component: PropertyComponent },
   { path: '', pathMatch: 'full', redirectTo: 'home' },
   { path: '**', pathMatch: 'full', redirectTo: 'home' }

];
