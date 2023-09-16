import { Usuario } from './usuario';

describe('Usuario', () => { // se utiliza para agrupar una serie de pruebas relacionadas bajo el nombre 'Usuario'
  it('should create an instance', () => { // verifica si es posible crear una instancia de la clase Usuario correctamente.
    expect(new Usuario()).toBeTruthy(); // Si es una instacia verdadera (truthy), la prueba pasa; de lo contrario, falla.
  });
});
