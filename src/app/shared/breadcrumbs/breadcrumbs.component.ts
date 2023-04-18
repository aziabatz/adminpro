import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string = '';
  public tituloSubs: Subscription;

  constructor(private router:Router) {
    this.tituloSubs = this.getRouteData().subscribe( ({titulo}) => {this.titulo = titulo} );;
  }

  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }

  getRouteData(): Observable<Data>{
    return this.router.events.
      pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild == null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }

}
