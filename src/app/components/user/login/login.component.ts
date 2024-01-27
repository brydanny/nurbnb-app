import { Component } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formulario: FormGroup;
  error: boolean;
  msgError: string;
  loading: boolean;

  constructor(private userService: UserService,
              private router: Router,
            ) {
    this.error = false;
    this.msgError = '';
    this.loading = true;

    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    this.loading = false;
  }
  onSubmit() {
    this.loading = true;
    this.error = false;
    this.msgError = '';
    if (!this.formulario.valid) {
      this.error = true;
      this.msgError = 'Todos los campos son requeridos';
      this.loading = false;
      return;
    }
    this.userService.login(this.formulario.value).subscribe((data: any) => {
      console.log('LoginComponent- LOGIN');
      console.log(data);
      if(data.statusCode == 400 || data.statusCode == 401){
        this.error = true;
        this.msgError = data.message;
        this.loading = false;
        return;
      }
      localStorage.setItem('token-nurbnb', data.access_token);
      this.loading = false;
      this.router.navigate(['/home']);

    }, (error: any) => {
      this.error = true;
      console.log(error.message);
      this.msgError = error.message;
      this.loading = false;
    });
  }

}
