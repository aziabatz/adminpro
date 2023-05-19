import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterForm } from 'app/interfaces/usuario.interface';
import { UsuarioService } from 'app/services/usuario.service';
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  });

  constructor(private fb:FormBuilder,
    private usuarioService: UsuarioService){}


  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value)

    if(this.registerForm.invalid)
      return
    
    this.usuarioService.crearUsuario(this.registerForm.value as RegisterForm)
      .subscribe(resp => {
        console.log('usuario creado', resp)
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }

  campoNoValido(campo: string): boolean{
    if(this.formSubmitted &&
      this.registerForm.get(campo)?.invalid){
        return true;
    }

    return false;
  }

  aceptaTerminos(){
    return this.formSubmitted && !this.registerForm.get('terminos')?.value
  }

  passwordsNoValidas(){
    if(!this.formSubmitted)
      return false;
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if(pass1 === pass2)
      return false;

    return true;
  }

}
