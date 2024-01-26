import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router,
              public userService: UserService
    ) {
  }

  onClickLogout() {
    console.log('logout');
    localStorage.removeItem('token-nurbnb');
    this.router.navigate(['/login']);

  }

}
