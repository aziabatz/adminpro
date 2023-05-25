import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [

    {
        path: 'dashboard', component: PagesComponent,
        canActivate: [AuthGuard],
        children: [

            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'} },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas'} },
            { path: 'settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS'} },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil del usuario'} },

            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación'} },

            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }