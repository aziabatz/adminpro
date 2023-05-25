import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'app/services/file-upload.service';
import { ModalImagenService } from 'app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit{

  public uploadImage?: File;
  public imgTemp: string|null = null;

  constructor(public modalService: ModalImagenService, public fileUploadService: FileUploadService){}

  ngOnInit(): void {
    
  }

  cerrar(){
    this.imgTemp = null;
    this.modalService.cerrarModal();
  }

  cambiarImagen(event: any){

    const file: File = event.target.files[0];

    if(!file){
      this.imgTemp = null; 
      return;
    }

    const reader = new FileReader();
    const base64 = reader.readAsDataURL(file);
    
    reader.onloadend = () => {
      this.imgTemp = reader.result as string;
    };



    this.uploadImage = file;

    
  }

  subirImagen(){
    const id = this.modalService.id;
    const tipo = this.modalService.tipo;

    if(this.uploadImage){
      this.fileUploadService.actualizarFoto(this.uploadImage, tipo, id || '')
        .then(img => {
          Swal.fire('Guardado', 'Imagen de usuario actuailzada', 'success');
          this.modalService.nuevaImagen.emit(img);
          this.cerrar();
        })
        .catch(err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        });
    }
  }
}
