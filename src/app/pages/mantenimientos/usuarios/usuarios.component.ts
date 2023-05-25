import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenComponent } from 'app/components/modal-imagen/modal-imagen.component';
import { Usuario } from 'app/models/usuario.model';
import { BusquedaService } from 'app/services/busqueda.service';
import { ModalImagenService } from 'app/services/modal-imagen.service';
import { UsuarioService } from 'app/services/usuario.service';
import { catchError, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde = 0;
  public cargando: boolean = true;

  private imgSubs!: Subscription;

  constructor(private userService: UsuarioService,
    private busquedaService: BusquedaService,
    private modalService: ModalImagenService){

      
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalService.nuevaImagen.subscribe(img => {
      this.cargarUsuarios();
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cambiarPagina(valor: number) {

    this.desde += valor;
    
    if(this.desde < 0){
      this.desde = 0;
    } else if(this.desde > this.totalUsuarios ){
      this.desde -= 5;
    }

    this.cargarUsuarios();

  }

  cargarUsuarios(){
    this.cargando = true;
    this.userService.cargarUsuarios(this.desde)
    .subscribe(resp => {
//      console.log(resp);
      this.totalUsuarios = resp.total;
      
      
      if(resp.usuarios.length){
        this.usuarios = resp.usuarios;
        this.usuariosTemp = resp.usuarios;
      }

      this.cargando = false;
      
    });
  }

  buscar(termino: string){
    if(termino.trim().length === 0){
      this.usuarios = [...this.usuariosTemp];
      return;
    }

    this.busquedaService.buscar('users', termino)
      .subscribe(resp => {
        this.usuarios = resp;
      });

  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.id === this.userService.uid){
      Swal.fire('No permitido', 'No se puede borrar el usuario el usuario actual', 'warning');
      return;
    }

    Swal.fire({
      title: '¿Desea borrar el usuario?',
      text: "¡Esta operación no se puede deshacer!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar borrado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.eliminarUsuario(usuario)
          .subscribe(resp => {
            Swal.fire(
            '¡Borrado!',
            `El usuario  ${usuario.name} ha sido borrado`,
            'success'
          );
          this.cargarUsuarios();
        });

        
      }
    })
    console.log(usuario);
  }

  cambiarRole(usuario: Usuario){
    this.userService.actualizarPerfil(usuario);
  }

  abrirModal(usuario: Usuario){
    this.modalService.abrirModal('users', usuario.id, usuario.img);
  }
}
