import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor(){
    

    // this.retornaObservable().pipe(
    //   retry()
    // )
    // .subscribe(
    //   valor => console.log('Subs:', valor),
    //   err => console.error('Error:', err),
    //   () => console.info('El observer termino')
    // );

    this.intervalSubs = this.retornaIntervalo().subscribe(
      console.log
    );
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaObservable(): Observable<number>{
    let i = -1;

    const obs$ = new Observable<number> (observer => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i === 2){
          observer.error('i llego a 2');
        }
      }, 1000);
    });

    return obs$;
  }


  retornaIntervalo(){
    const interval$ = interval(500)
      .pipe(
        //take(10),
        map(valor => valor+1),
        filter(valor => valor%2===0)
      );
    return interval$;
  }
}
