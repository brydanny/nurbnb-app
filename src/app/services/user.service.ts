import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

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
    logout(){
      localStorage.removeItem('token-nurbnb');
    }
    getIdGuest():any{
      if(!this.isLogged()){
        return null;
      }
      let token = localStorage.getItem('token-nurbnb');
      let decodeToken = token ? jwtDecode(token) : null;
      if(decodeToken && !('isGuest' in decodeToken)){
        return null;
      }
      return decodeToken ? decodeToken.sub : null;
    }
    getIdHost():any{
      if(!this.isLogged()){
        return null;
      }
      let token = localStorage.getItem('token-nurbnb');
      let decodeToken = token ? jwtDecode(token) : null;
      if(decodeToken && !('isHost' in decodeToken)){
        return null;
      }
      return decodeToken ? decodeToken.sub : null;
    }
    getIsGuest():boolean{
      if(!this.isLogged()){
        return false;
      }
      let token = localStorage.getItem('token-nurbnb');
      let decodeToken = token ? jwtDecode(token) : null;
      if(decodeToken && !('isGuest' in decodeToken)){
        return false;
      }
      return decodeToken ? decodeToken.isGuest as boolean : false;
    }
    getIsHost():boolean{
      if(!this.isLogged()){
        return false;
      }
      let token = localStorage.getItem('token-nurbnb');
      let decodeToken = token ? jwtDecode(token) : null;
      if(decodeToken && !('isHost' in decodeToken)){
        return false;
      }
      return decodeToken ? decodeToken.isHost as boolean : false;
    }
}
