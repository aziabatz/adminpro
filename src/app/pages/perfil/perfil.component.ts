import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'app/models/usuario.model';
import { FileUploadService } from 'app/services/file-upload.service';
import { UsuarioService } from 'app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  public perfilForm!: FormGroup;
  public user?: Usuario;
  public uploadImage?: File;
  public imgTemp: string|null = null;
  

  constructor(private fb: FormBuilder, private userService: UsuarioService,
    private fileUploadService: FileUploadService){

    this.user = userService.user;
  }

  ngOnInit(){

    this.perfilForm = this.fb.group({
      nombre: [this.user?.nombre, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    this.userService.actualizarPerfil({
      name: this.perfilForm.controls['nombre'].value,
      email: this.perfilForm.controls['email'].value,
      role: 'user'
    })
      .subscribe(() => {
        const {nombre, email} = this.perfilForm.value;
        if(this.user){
          this.user!.nombre = nombre;
          this.user!.email = email;

          Swal.fire('Guardado', 'Cambios guardados con éxito', 'success');
        }
        
      }, error => {
        console.log(error.error)
        Swal.fire('Error', 'Algo ha ido mal: ' + error.error.msg, 'error');
      });
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
    if(this.uploadImage){
      this.fileUploadService.actualizarFoto(this.uploadImage, 'users', this.user?.uid || '')
        .then(img => {
          this.user!.img = img;
          Swal.fire('Guardado', 'Imagen de usuario actuailzada', 'success');
        })
        .catch(err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        });
    }
  }
}
