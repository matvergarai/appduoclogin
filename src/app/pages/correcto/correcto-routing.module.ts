import { NgModule } from '@angular/core'; // Importa el módulo NgModule de la biblioteca principal de Angular.
import { Routes, RouterModule } from '@angular/router'; // se importan clases desde el modulo de angular

import { CorrectoPage } from './correcto.page'; // importa la pagina CorrectoPage desde correcto.page

const routes: Routes = [ // la configuración de las rutas para esta página. 
  {
    path: '', // ruta definida
    component: CorrectoPage
  }
];

@NgModule({ // configuración de enrutamiento para CorrectoPage
  imports: [RouterModule.forChild(routes)], // se utiliza para configurar las rutas definidas en la variable routes con forChild, rutas secundarias.
  exports: [RouterModule],
})
export class CorrectoPageRoutingModule {} // se exporta ara que pueda ser utilizado por otros módulos de la aplicación que lo necesiten.
