import { NgModule } from '@angular/core'; // decorador que se utiliza para definir un módulo en Angular.
import { CommonModule } from '@angular/common'; // directivas comunes como ngIf y ngFor.
import { FormsModule } from '@angular/forms'; // funcionalidad de formularios en la aplicación.

import { IonicModule } from '@ionic/angular'; // funcionalidades específicas de Ionic que se utilizarán en la página.

import { CorreoPageRoutingModule } from './correo-routing.module'; // rutas de navegación relacionadas con la página "CorreoPage".

import { CorreoPage } from './correo.page';

@NgModule({
  imports: [ // enumera los módulos que se importan y se utilizan en este módulo.
    CommonModule,
    FormsModule,
    IonicModule,
    CorreoPageRoutingModule
  ],
  declarations: [CorreoPage] // enumera los componentes, directivas y tuberías que pertenecen a este módulo
})
export class CorreoPageModule {}
