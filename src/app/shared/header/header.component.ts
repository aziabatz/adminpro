import { Component } from '@angular/core';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    
  ]
})
export class HeaderComponent {

  user?: Usuario;

  constructor(private userService:UsuarioService){
    this.user = userService.user;
  }

  logout(){ 
    this.userService.logout();
  }

}
