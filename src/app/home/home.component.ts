import { Component } from '@angular/core';
import { EmpleadosService } from '../services/empleados.service';
import { RegistrosService } from '../services/registros.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nif: string = '';
  empleado: any = null;
  empleadoMostrado: any = null; // ✅ lo agregamos
  mensajeError: string = ''; // ✅ lo agregamos
  private timeoutId: any;

  constructor(
    private empleadosService: EmpleadosService,
    private registrosService: RegistrosService,
    private router: Router
  ) {}

  buscarEmpleado() {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    if (!this.nif.trim()) {
      this.mensajeError = 'Ingrese un NIF válido'; // ✅ corregido
      return;
    }

    this.empleadosService.getEmpleadoPorNIF(this.nif).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.empleadoMostrado = {
            ...response.data,
            foto: `http://localhost:3000/${response.data.foto}`
          };

          this.registrosService.createRegistro({
            nif: this.nif
          }).subscribe();

          this.timeoutId = setTimeout(() => {
            this.empleadoMostrado = null;
            this.nif = '';
          }, 5000);

        } else {
          this.mensajeError = 'Empleado no encontrado';
        }
      },
      error: (err) => {
        this.mensajeError = 'Error en la conexión';
        console.error(err);
      }
    });
  }

  irARH() {
    this.router.navigate(['/rh-login']);
  }
}
