import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent {

  progreso1 = 25;
  progreso2 = 35;

  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  get getProgreso2() {
    return `${this.progreso2}%`;
  }

  cambioValor1(valor: number) {
    this.progreso1 = valor;
  }

  cambioValor2(valor: number) {
    this.progreso2 = valor;
  }

}
