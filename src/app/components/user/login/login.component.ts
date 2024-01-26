import { Component } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formulario: FormGroup;
  error: boolean;
  msgError: string;
  loading: boolean;

  constructor(private userService: UserService) {
    this.error = false;
    this.msgError = '';
    this.loading = true;

    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }
  onSubmit() {
    this.loading = true;
    console.log("form submit");
    console.log(this.formulario.value);
    this.userService.login(this.formulario.value).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('token-nurbnb', data.access_token);
      let decodeTokent = jwtDecode(data.access_token);
      console.log(decodeTokent);
      this.loading = false;
    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
  }

}
