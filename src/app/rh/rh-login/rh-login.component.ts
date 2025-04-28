import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rh-login',
  standalone: false,
  templateUrl: './rh-login.component.html',
  styleUrls: ['./rh-login.component.css']
})
export class RhLoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // 🔥 Sin validaciones, simplemente redirige
    this.router.navigate(['/rh']);
  }
}
