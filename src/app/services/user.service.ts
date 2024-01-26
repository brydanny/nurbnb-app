import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  nameService : string = 'security';

  constructor(private httpService: HttpService) {
    console.log('User service listo');
   }

   register(user:User){
    return this.httpService.post('security/register',user,this.nameService);
   }
   login(user:User){
    return this.httpService.post('security/login',user,this.nameService);
   }
   isLogged():boolean{
     return !!localStorage.getItem('token-nurbnb');
   }
}
