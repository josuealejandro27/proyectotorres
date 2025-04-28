import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RhLoginComponent } from './rh/rh-login/rh-login.component';
import { RhDashboardComponent } from './rh/rh-dashboard/rh-dashboard.component';
import { RegistrarEmpleadoComponent } from './rh/registrar-empleado/registrar-empleado.component';
import { BuscarRegistrosComponent } from './rh/buscar-registros/buscar-registros.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rh-login', component: RhLoginComponent },
  { 
    path: 'rh', 
    component: RhDashboardComponent,
    children: [
      { path: 'registrar-empleado', component: RegistrarEmpleadoComponent },
      { path: 'buscar-registros', component: BuscarRegistrosComponent },
      { path: '', redirectTo: 'registrar-empleado', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }