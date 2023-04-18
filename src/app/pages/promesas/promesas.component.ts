import { Component, OnInit } from '@angular/core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit{

  ngOnInit(): void {
    const promesa = new Promise((resolve, reject) => {
      resolve('Hola Mundo');
      //reject('hubo problema');
    });

    promesa.then((msg) => console.log("termino: " + msg))
      .catch((err) => console.log(`ERROR: ${err}`));
    console.log('Fin del init');

    this.getUsuarios();
  }

  getUsuarios(){

    fetch('https://reqres.in/api/users')
      .then(res => res.json()
          .then(body => console.log(body)))
      .catch(err => console.log('hay un error'));

  }

}
