import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rh-login',
  standalone: false,
  templateUrl: './rh-login.component.html',
  styleUrls: ['./rh-login.component.css']
})
export class RhLoginComponent {
  usuario: string = '';
  password: string = '';
  error: string = '';
  cargando: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goHome() {
    this.router.navigate(['/']); // Redirige al Home (o cambia a '/home' si tu ruta es diferente)
  }
  
  login() {
    this.error = '';
    this.cargando = true;
    
    if (!this.usuario || !this.password) {
      this.error = 'Debe ingresar usuario y contraseña';
      this.cargando = false;
      return;
    }

    this.authService.loginRH(this.usuario, this.password).subscribe({
      next: (response: any) => {
        this.cargando = false;
        if (response.success) {
          // Opcional: guardar datos de usuario en localStorage si necesitas
          localStorage.setItem('userData', JSON.stringify(response.data));
          
          // Redireccionar según el rol
          if (response.data.rol === 'admin') {
            this.router.navigate(['/rh']);
          }
        }
      },
      error: (err) => {
        this.cargando = false;
        if (err.status === 401) {
          this.error = 'Usuario o contraseña incorrectos';
        } else if (err.status === 403) {
          this.error = 'No tiene permisos para acceder';
        } else {
          this.error = 'Error en el servidor. Intente más tarde';
        }
        console.error('Error de login:', err);
      }
    });
  }
}