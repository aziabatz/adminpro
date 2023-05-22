import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from 'app/shared/shared.module';
import { HeaderComponent } from 'app/shared/header/header.component';
import { SidebarComponent } from 'app/shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from 'app/shared/breadcrumbs/breadcrumbs.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { NgChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ]
})
export class PagesModule { }
