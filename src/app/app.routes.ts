import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { PropertyComponent } from './components/property/property.component';
import { RegisterHostComponent } from './components/user/register-host/register-host.component';
import { LoginComponent } from './components/user/login/login.component';
import { BookingComponent } from './components/booking/booking.component';

export const routes: Routes = [
  { path: 'home',
   loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
   { path: 'search', component: SearchComponent },
   { path: 'property/:id', component: PropertyComponent },
   { path: 'booking', component: BookingComponent },
   { path: 'register-host', component: RegisterHostComponent },
   { path: 'login', component: LoginComponent },
   { path: '', pathMatch: 'full', redirectTo: 'home' },
   { path: '**', pathMatch: 'full', redirectTo: 'home' }

];
