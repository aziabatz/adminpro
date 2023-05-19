import { Component } from '@angular/core';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    
  ]
})
export class HeaderComponent {

  constructor(private userService:UsuarioService){}

  logout(){ 
    this.userService.logout();
  }

}
