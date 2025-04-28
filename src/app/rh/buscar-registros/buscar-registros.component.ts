import { Component } from '@angular/core';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'app-buscar-registros',
  standalone:false,
  templateUrl: './buscar-registros.component.html',
  styleUrls: ['./buscar-registros.component.css']
})
export class BuscarRegistrosComponent {
  filtros = {
    nif: '',
    fechaInicio: '',
    fechaFin: '',
    faltas: ''
  };

  registros: any[] = [];

  constructor(private registrosService: RegistrosService) {}

  buscar() {
    this.registrosService.searchRegistrations(this.filtros).subscribe({
      next: (data) => this.registros = data as any[],
      error: (err) => alert('Error: ' + err.message)
    });
  }
}