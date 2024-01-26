import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-register-host',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './register-host.component.html',
  styleUrl: './register-host.component.css'
})
export class RegisterHostComponent {

}
