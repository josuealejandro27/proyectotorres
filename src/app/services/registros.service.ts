import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  private apiUrl = 'http://localhost:3000/api/registros';

  constructor(private http: HttpClient) {}

  createRegistro(registro: any) {
    return this.http.post(this.apiUrl, registro);
  }

  getRegistros() {
    return this.http.get(this.apiUrl);
  }

  searchRegistrations(filtros: any) {
    return this.http.post(`${this.apiUrl}/buscar`, filtros);
  }
}
