import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RhLoginComponent } from './rh/rh-login/rh-login.component';
import { RhDashboardComponent } from './rh/rh-dashboard/rh-dashboard.component';
import { RegistrarEmpleadoComponent } from './rh/registrar-empleado/registrar-empleado.component';
import { BuscarRegistrosComponent } from './rh/buscar-registros/buscar-registros.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RhLoginComponent,
    RhDashboardComponent,
    RegistrarEmpleadoComponent,
    BuscarRegistrosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }