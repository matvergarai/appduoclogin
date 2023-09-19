import { Asistencia } from './asistencia'; // importa la clase "Asistencia" desde  "asistencia". 

describe('Asistencia', () => { // bloque de pruebas llamado "Asistencia"
  it('should create an instance', () => { // verificar si se puede crear una instancia de la clase "Asistencia".
    expect(new Asistencia()).toBeTruthy(); //  comprobar si la creación de una instancia de la clase "Asistencia" es exitosa
  });
});
