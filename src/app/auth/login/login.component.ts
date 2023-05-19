import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'app/interfaces/login-form.interface';
import { UsuarioService } from 'app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn')
  googleBtn!: ElementRef;
  
  public auth2: any;

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router:Router,
              private fb: FormBuilder,
              private userService: UsuarioService,
              private ngZone: NgZone){}

  googleInit(){
    google.accounts.id.initialize({
      client_id: '349136989516-4th3a55j61hhg9arlci2re1pfh629c9v.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginGoogle(response.credential)
      .subscribe(resp => {
        console.log({login: resp});
        this.router.navigateByUrl('/');
      });
  }
  
  ngAfterViewInit(): void {
    this.googleInit();
  }

  async startApp(){

    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    
    this.attachSignin(document.getElementById('my-signin2'));


  }

  attachSignin(element: any){
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe(
          resp => {this.ngZone.run(()=>{this.router.navigateByUrl('/')})}
        );
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  
  login(){
    //console.log("submit", this.loginForm.value);
    //this.router.navigateByUrl('/');

    this.userService.login( this.loginForm.value as LoginForm )
      .subscribe(resp => {

        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value!);
        } else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
