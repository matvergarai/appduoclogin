import { ComponentFixture, TestBed } from '@angular/core/testing';// funciones y clases necesarias de Angular para las pruebas unitarias.
import { CorrectoPage } from './correcto.page';

describe('CorrectoPage', () => { // agrupa las pruebas relacionadas con el componente CorrectoPage
  let component: CorrectoPage; // para acceder al componente 
  let fixture: ComponentFixture<CorrectoPage>;// para crear una instancia de CorrectoPage dentro del entorno de prueba.

  beforeEach(async(() => { // se configura el entorno de prueba antes de cada prueba
    fixture = TestBed.createComponent(CorrectoPage); // crea una instancia de CorrectoPage utilizando TestBed.
    component = fixture.componentInstance; // referencia al componente creado y la asigna a la variable component.
    fixture.detectChanges();// detecta cambios en el componente
  }));

  it('should create', () => { // prueba específica que verifica si el componente se crea correctamente.
    expect(component).toBeTruthy(); //  si no es nula ni indefinida, crea el componente.
  });
});
