import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal = true;
  public tipo!: 'users' | 'doctors' | 'hospitals';
  public id!: string;
  public img?: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter();

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo: 'users'|'doctors'|'hospitals',
  id: string = '',
  img: string = 'no-image'){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    if(img.includes('http')){
      this.img = img
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
  }

  cerrarModal(){
    this._ocultarModal = true;
  }

  constructor() { }
}
