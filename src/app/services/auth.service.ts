import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) { }

  loginRH(nif: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { nif, password });
  }

  logout() {
    // Ya no guardamos token ni nada
    console.log('Logout');
  }
}
