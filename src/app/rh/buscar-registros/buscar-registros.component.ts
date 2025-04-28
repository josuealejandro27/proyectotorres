import { Component } from '@angular/core';
import { RegistrosService } from '../../services/registros.service';


@Component({
  selector: 'app-buscar-registros',
  standalone: false,
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

  // Variables del modal
  modalAbierto = false;
  registroSeleccionado: any = null;
  comentarioEditado: string = '';

  constructor(private registrosService: RegistrosService) {}

  modalExitoVisible = false;


  buscar() {
    this.registrosService.searchRegistrations(this.filtros).subscribe({
      next: (data) => this.registros = data as any[],
      error: (err) => alert('Error: ' + err.message)
    });
  }

  abrirModal(registro: any) {
    this.registroSeleccionado = registro;
    this.comentarioEditado = registro.comentario || '';
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.registroSeleccionado = null;
    this.comentarioEditado = '';
  }

  guardarComentario() {
    if (!this.registroSeleccionado?._id) {
      alert('Registro inválido');
      return;
    }
  
    this.registrosService.updateComentario(this.registroSeleccionado._id, this.comentarioEditado).subscribe({
      next: () => {
        // ✅ Actualizar también en la tabla
        this.registroSeleccionado.comentario = this.comentarioEditado;
        this.cerrarModal();
  
        // ✅ Mostrar modal de éxito
        this.mostrarModalExito();
      },
      error: (err) => {
        console.error('Error actualizando comentario', err);
        alert('Error al actualizar comentario');
      }
    });
  }
  
  mostrarModalExito() {
    this.modalExitoVisible = true;
    setTimeout(() => {
      this.modalExitoVisible = false;
    }, 2000); // Se cierra automáticamente en 2 segundos
  }
  
}
