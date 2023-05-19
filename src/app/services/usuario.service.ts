import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'app/interfaces/login-form.interface';
import { RegisterForm } from 'app/interfaces/usuario.interface';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const baseUrl = environment.base_url;

declare const google: any;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
   }

  public auth2: any;

  async googleInit(){

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '349136989516-4th3a55j61hhg9arlci2re1pfh629c9v.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });

        resolve();
      });

    });
    
  }

  
  logout(){
    localStorage.removeItem('token');

    
    // this.auth2.signOut().then(() => {

    //   console.log("Signout ")
    //   this.ngZone.run(() => {
        
    //     this.router.navigateByUrl('/login');
    //   });
      
    // });

    google.accounts.id.revoke('aziabatz@alumnos.unex.es', () => {
      this.router.navigateByUrl('/login');
    });
  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    
    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token': token
      }
    })
    .pipe(
      tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
        }
      ),
      map( resp => true),
      catchError((error) => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    console.log('Creando usuario')
    
    return this.http.post(baseUrl + '/users', {
      name: formData.nombre,
      email: formData.email,
      password: formData.password
    })
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }


  login(formData: LoginForm){

    return this.http.post(baseUrl + '/login', formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      )
  }

}
