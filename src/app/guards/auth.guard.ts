import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private userService: UsuarioService,
    private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.userService.validarToken()
        .pipe(
          tap(isAuth => {
            if(!isAuth){
              this.router.navigateByUrl('/login');
            }
          })
        )
  }
  
}
