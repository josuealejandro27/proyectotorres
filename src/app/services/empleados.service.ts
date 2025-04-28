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

  crearEmpleado(empleado: any) {
    return this.http.post(this.apiUrl, empleado);
  }
}
