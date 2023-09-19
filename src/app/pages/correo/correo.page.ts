import { Component, OnInit } from '@angular/core';// componente se encargará de manejar la lógica relacionada con el inicio de sesión a través del correo electrónico.
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergentes
import { Usuario } from 'src/app/model/usuario'; //Se importa la clase Usuario

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public usuario: Usuario; // se inicializa una instancia de la clase Usuario llamada Usuario

  constructor(private router: Router, private toastController: ToastController) { // establece un correo electrónico y una contraseña iniciales 
    this.usuario = new Usuario('', '', '', '', '', '', 0, null)

    
    this.usuario.setUsuario('giovanni@duocuc.cl', '1234');
    
  }

  public recuperar(): void { 
    if (this.usuario) {
      const usu: Usuario | undefined = this.usuario.buscarCorreoValido(this.usuario.correo); // busca un usuario válido con el correo proporcionado

      if (usu) {
        const navigationExtras: NavigationExtras = { 
          state: {
            usuario: usu
          }
        };
        this.router.navigate(['/pregunta'], navigationExtras) //Si se encuentra un usuario válido, se utiliza Router para navegar a la página /pregunta
      }
      else {
        this.router.navigate(['/incorrecto']) //  Si no se encuentra un usuario válido, se navega a la página /incorrecto.
      }
    }
  } 

  ngOnInit() {
  }

}
