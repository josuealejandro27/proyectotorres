import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rh-dashboard',
  standalone: false,
  templateUrl: './rh-dashboard.component.html',
  styleUrls: ['./rh-dashboard.component.css']
})
export class RhDashboardComponent {
  menuItems = [
    { path: 'registrar-empleado', label: 'Registrar Empleado' },
    { path: 'buscar-registros', label: 'Buscar Registros' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/rh-login']);
  }
}
