import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {}

  getEmpleadoPorNIF(nif: string) {
    return this.http.get<any>(`${this.apiUrl}/nif/${nif}`);
  }

  // empleados.service.ts
crearEmpleado(formData: FormData) {
  // No es necesario establecer headers, FormData lo hace automáticamente
  return this.http.post<any>(`${this.apiUrl}`, formData);
}
}
