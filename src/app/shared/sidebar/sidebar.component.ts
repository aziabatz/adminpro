import { Component } from '@angular/core';
import { Usuario } from 'app/models/usuario.model';
import { SidebarService } from 'app/services/sidebar.service';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menuItems: any[];
  user?: Usuario;

  constructor(private sidebarService: SidebarService,
    private userService:UsuarioService) {
    this.menuItems = sidebarService.menu;
    this.user = userService.user;
  }




}
