import { ComponentFixture, TestBed } from '@angular/core/testing'; // // funciones y clases necesarias de Angular para las pruebas unitarias.
import { CorreoPage } from './correo.page';

describe('CorreoPage', () => { // agrupa las pruebas relacionadas con el componente CorreoPage
  let component: CorreoPage; // para acceder al componente
  let fixture: ComponentFixture<CorreoPage>;// para crear una instancia de CorreoPage dentro del entorno de prueba.

  beforeEach(async(() => { // se configura el entorno de prueba antes de cada prueba
    fixture = TestBed.createComponent(CorreoPage); // crea una instancia de CorreoPage utilizando TestBed.
    component = fixture.componentInstance; // referencia al componente creado y la asigna a la variable component.
    fixture.detectChanges(); // detecta cambios en el componente
  }));

  it('should create', () => { // prueba específica que verifica si el componente se crea correctamente.
    expect(component).toBeTruthy(); //  si no es nula ni indefinida, crea el componente.
  });
});
