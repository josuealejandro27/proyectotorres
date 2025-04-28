import { Component } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-empleado',
  standalone: false,
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent {
  nuevoEmpleado: any = {
    nombre: '',
    nif: '',
    email: '',
    telefono: '',
    foto: null,
    departamento: '',
    puesto: '',
    horario: 'corrido', // Default value
    entrada1: '',
    salida1: '',
    entrada2: '',
    salida2: '',
    password: '',
    rol: 'empleado' // Siempre será "empleado", no se puede cambiar
  };

  previewFoto: string | ArrayBuffer | null = null;
  formSubmitted = false;
  emailError = '';
  telefonoError = '';
  passwordError = '';

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router
  ) {}

    // Variables para modales
    modalExitoVisible = false;
    modalErrorVisible = false;
    errorMensaje = '';
    
    mostrarModalExito() {
      this.modalExitoVisible = true;
      setTimeout(() => {
        this.modalExitoVisible = false;
      }, 2000); // Se cierra solo en 2 segundos
    }
    
    mostrarModalError(mensaje: string) {
      this.errorMensaje = mensaje;
      this.modalErrorVisible = true;
      setTimeout(() => {
        this.modalErrorVisible = false;
      }, 3000); // Error dura 3 segundos
    }
    

  generarNIF(nombre: string): string {
    if (!nombre.trim()) return '';
    
    // Extraer iniciales del nombre
    const palabras = nombre.trim().split(' ');
    let iniciales = '';
    
    // Tomamos hasta 3 iniciales de las primeras palabras
    for (let i = 0; i < Math.min(palabras.length, 3); i++) {
      if (palabras[i].length > 0) {
        iniciales += palabras[i][0].toUpperCase();
      }
    }
    
    // Generar 5 números aleatorios
    let numeros = '';
    for (let i = 0; i < 5; i++) {
      numeros += Math.floor(Math.random() * 10).toString();
    }
    
    return iniciales + numeros;
  }

  onNombreChange() {
    this.nuevoEmpleado.nif = this.generarNIF(this.nuevoEmpleado.nombre);
  }

  validarEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!this.nuevoEmpleado.email) {
      this.emailError = 'El email es obligatorio';
      return false;
    } else if (!emailPattern.test(this.nuevoEmpleado.email)) {
      this.emailError = 'El email no tiene un formato válido';
      return false;
    }
    this.emailError = '';
    return true;
  }

  // Método para limitar la entrada del teléfono a solo números y máximo 10 dígitos
  limitarTelefono() {
    // Eliminar cualquier carácter que no sea número
    this.nuevoEmpleado.telefono = this.nuevoEmpleado.telefono.replace(/[^0-9]/g, '');
    
    // Limitar a 10 dígitos
    if (this.nuevoEmpleado.telefono.length > 10) {
      this.nuevoEmpleado.telefono = this.nuevoEmpleado.telefono.substring(0, 10);
    }
  }

  validarTelefono(): boolean {
    const telefonoPattern = /^[0-9]{10}$/;
    if (!this.nuevoEmpleado.telefono) {
      this.telefonoError = 'El teléfono es obligatorio';
      return false;
    } else if (!telefonoPattern.test(this.nuevoEmpleado.telefono)) {
      this.telefonoError = 'El teléfono debe contener exactamente 10 dígitos numéricos';
      return false;
    }
    this.telefonoError = '';
    return true;
  }

  validarPassword(): boolean {
    if (!this.nuevoEmpleado.password) {
      this.passwordError = 'La contraseña es obligatoria';
      return false;
    } else if (this.nuevoEmpleado.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }
    this.passwordError = '';
    return true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.nuevoEmpleado.foto = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewFoto = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  validarFormulario(): boolean {
    this.formSubmitted = true;
    
    const emailValido = this.validarEmail();
    const telefonoValido = this.validarTelefono();
    const passwordValido = this.validarPassword();
    
    // Validar campos requeridos
    const camposRequeridos = 
      this.nuevoEmpleado.nombre &&
      this.nuevoEmpleado.nif &&
      this.nuevoEmpleado.departamento &&
      this.nuevoEmpleado.puesto &&
      this.nuevoEmpleado.horario &&
      this.nuevoEmpleado.entrada1 &&
      this.nuevoEmpleado.salida1;
    
    // Validar campos adicionales para horario mixto
    const camposMixtoValidos = this.nuevoEmpleado.horario !== 'mixto' || 
      (this.nuevoEmpleado.entrada2 && this.nuevoEmpleado.salida2);
    
    return emailValido && telefonoValido && passwordValido && camposRequeridos && camposMixtoValidos;
  }

  registrar() {
    if (!this.validarFormulario()) {
      this.mostrarModalError('Por favor, completa correctamente todos los campos requeridos');
      return;
    }
    
    // Asegurar que el rol siempre sea "empleado"
    this.nuevoEmpleado.rol = 'empleado';
  
    const formData = new FormData();
    
    // Agregar campos uno a uno para evitar errores
    formData.append('nombre', this.nuevoEmpleado.nombre);
    formData.append('nif', this.nuevoEmpleado.nif);
    formData.append('email', this.nuevoEmpleado.email);
    formData.append('telefono', this.nuevoEmpleado.telefono);
    formData.append('departamento', this.nuevoEmpleado.departamento);
    formData.append('puesto', this.nuevoEmpleado.puesto);
    formData.append('horario', this.nuevoEmpleado.horario);
    formData.append('entrada1', this.nuevoEmpleado.entrada1);
    formData.append('salida1', this.nuevoEmpleado.salida1);
    formData.append('password', this.nuevoEmpleado.password);
    formData.append('rol', this.nuevoEmpleado.rol);
    
    if (this.nuevoEmpleado.horario === 'mixto') {
      formData.append('entrada2', this.nuevoEmpleado.entrada2);
      formData.append('salida2', this.nuevoEmpleado.salida2);
    }
    
    if (this.nuevoEmpleado.foto) {
      formData.append('foto', this.nuevoEmpleado.foto, this.nuevoEmpleado.foto.name);
    }
    
    this.empleadosService.crearEmpleado(formData).subscribe({
      next: (response) => {
        this.mostrarModalExito(); // ✅ Mostrar modal de éxito
        this.resetFormulario();
        this.router.navigate(['/rh']);
      },
      error: (err) => {
        console.error('Error completo:', err);
        this.mostrarModalError(err.error?.message || 'Error desconocido al guardar');
      }
    });
  }
  
  
  resetFormulario() {
    this.formSubmitted = false;
    this.nuevoEmpleado = {
      nombre: '',
      nif: '',
      email: '',
      telefono: '',
      foto: null,
      departamento: '',
      puesto: '',
      horario: 'corrido',
      entrada1: '',
      salida1: '',
      entrada2: '',
      salida2: '',
      password: '',
      rol: 'empleado'
    };
    this.previewFoto = null;
    this.emailError = '';
    this.telefonoError = '';
    this.passwordError = '';
  }
}