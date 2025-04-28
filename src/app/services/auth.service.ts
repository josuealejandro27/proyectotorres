import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  success: boolean;
  data?: {
    id: string;
    nif: string;
    nombre: string;
    rol: string;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) { }

  loginRH(nif: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { nif, password });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userData') !== null;
  }

  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  isAdmin(): boolean {
    const userData = this.getUserData();
    return userData && userData.rol === 'admin';
  }

  logout() {
    localStorage.removeItem('userData');
  }
}