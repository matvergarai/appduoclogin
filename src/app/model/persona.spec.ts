 // probar la clase llamada Persona

import { Persona } from './persona'; // importa la clase Persona
describe('Persona', () => { // agrupando todas las pruebas relacionadas con la clase Persona
  it('should create an instance', () => { //  indica lo que se espera que haga la prueba
    expect(new Persona()).toBeTruthy(); // Esta prueba verifica que se pueda crear una instancia de la clase Persona sin errores.
  });
});
