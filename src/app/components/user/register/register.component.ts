import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formulario: FormGroup;
  user: User;
  error: boolean;
  msgError: string;
  loading: boolean;

  constructor(private userService: UserService) {

    this.error = false;
    this.msgError = '';
    this.loading = true;

    this.formulario = new FormGroup({
      name: new FormControl(),
      lastname: new FormControl(),
      password: new FormControl(),
      email: new FormControl()
    });
    this.user = this.formulario.value;
  }

  onSubmit() {
    this.loading = true;
    console.log("form submit");
    console.log(this.formulario.value);
    this.user = this.formulario.value;
    console.log("user");
    this.user.country = "Bolivia";
    this.user.city = "La Paz";
    this.user.isHost = false;
    this.user.isGuest = true;
    console.log(this.user);

    this.userService.register(this.user).subscribe((data: any) => {
      console.log(data);
      this.loading = false;
    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
  }

}
