import { NgModule } from '@angular/core'; // Importa el módulo NgModule de la biblioteca principal de Angular.
import { Routes, RouterModule } from '@angular/router'; // se importan clases desde el modulo de angular

import { CorreoPage } from './correo.page'; // importa la pagina CorreoPage desde correo.page

const routes: Routes = [ //la configuración de las rutas para esta página.
  {
    path: '', // ruta definida
    component: CorreoPage
  }
];

@NgModule({ // configuración de enrutamiento para CorreoPage
  imports: [RouterModule.forChild(routes)], // se utiliza para configurar las rutas definidas en la variable routes con forChild, rutas secundarias.
  exports: [RouterModule],
})
export class CorreoPageRoutingModule {} // se exporta ara que pueda ser utilizado por otros módulos de la aplicación que lo necesiten.
