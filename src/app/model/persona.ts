import { NivelEducacional } from "./nivel-educacional"; // se importa la clase o modulo

export class Persona { // Declaración de la clase Persona
  // Propiedades públicas
  public nombre; 
  public apellido;
  public nivelEducacional: NivelEducacional | undefined;
  public fechaNacimiento: Date | null;
  

  constructor() { // inicializa todas las propiedades de la persona
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = undefined;
    this.fechaNacimiento = null;
  }

  public setPersona(nombre: string, apellido: string, idNivelEducacional: number
      , fechaNacimiento: Date | null) { // método para establecer los datos de la persona 
    this.nombre = nombre;
    this.apellido = apellido;
    this.nivelEducacional = NivelEducacional.findNivelEducacionalById(idNivelEducacional);
    this.fechaNacimiento = fechaNacimiento;
  }
  // devuelven información relacionada con la persona. Si alguna de las propiedades no está asignada, se devuelve "No asignado". 
  public getNombre(): string {
    if (this.nombre.trim() === '') return 'No asignado';
    return this.nombre;
  }

  public getApellido(): string {
    if (this.apellido.trim() === '') return 'No asignado';
    return this.apellido;
  }

  public getIdNivelEducacional(): string {
    if (this.nivelEducacional === undefined) return 'No asignado';
    return this.nivelEducacional.id.toString();
  }

  public getNombreNivelEducacional(): string {
    if (this.nivelEducacional === undefined) return 'No asignado';
    return this.nivelEducacional.nombre;
  }

  public  getNivelEducacional(): string {
    if (this.nivelEducacional === undefined) return 'No asignado';
    return `${this.nivelEducacional.id} - ${this.nivelEducacional.nombre}`;
  }

  public getFechaNacimiento(): string {
    if (this.fechaNacimiento === null) return 'No asignado';
    return this.formatDateToDDMMYYYY(this.fechaNacimiento);
  }

  public formatDateToDDMMYYYY(date: Date): string { // se utiliza para formatear la fecha de nacimiento en el formato "dd/mm/yyyy".
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 ya que los meses van de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}