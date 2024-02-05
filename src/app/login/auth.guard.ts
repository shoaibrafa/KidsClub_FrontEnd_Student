import { CanActivateFn, Router } from '@angular/router';
import { User } from './user.model';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {

  const data = localStorage.getItem("data");
  if(data !== null){
      const user: User = JSON.parse(data)
      console.log(new Date(user._expiration_date));

      if(new Date(user._expiration_date) > new Date){
          return true;
      }
    }
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
}
