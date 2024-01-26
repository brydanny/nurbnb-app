import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;
  if(localStorage.getItem('token-nurbnb')){
    clonedRequest = req.clone({
      setHeaders: {
        Autorization: `Bearer ${localStorage.getItem('token-nurbnb')}`!
      }
    })
  }

  return next(clonedRequest);
};
