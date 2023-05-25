import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'app/models/usuario.model';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';



const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') ||'';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuarios(resultados: any[]): Usuario[]{
    
    return resultados.map(user => new Usuario(user.name,
      user.email,
      '',
      user.img,
      user.google,
      user.role,
      user.uid));

    return [];
  }

  buscar(tipo: 'users'|'doctors'|'hospitals',
    termino: string,
    ){
    const url = `${baseUrl}/search/${tipo}/${termino}`;
    return this.http.get<Usuario[]>(url, this.headers)
      .pipe(
        map((resp:any) => {
          switch(tipo){
            case 'users':
              return this.transformarUsuarios(resp.result);
              break;
            
            default:
              return [];
          }
        })
      )
  }


}
