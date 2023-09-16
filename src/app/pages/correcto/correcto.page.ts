import { Component, OnInit } from '@angular/core'; // dependencias necesarias desde el módulo @angular/core

@Component({ // se utiliza para configurar y definir metadatos relacionados con el componente (angular)
  selector: 'app-correcto', // Define el nombre del selector HTML que se usara para intanciar el componente en las demas paginas
  templateUrl: './correcto.page.html', // Especifica la ubicación de la plantilla HTML
  styleUrls: ['./correcto.page.scss'],// hojas de estilo que se aplicarán a este componente.
})
export class CorrectoPage implements OnInit { //  definición del componente

  constructor() { } // inyectar dependencias

  ngOnInit() { // para realizar tareas de inicialización o configuración necesarias para el componente.
  }

}
