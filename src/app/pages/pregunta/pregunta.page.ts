import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  public respuesta: string = ''; 

  constructor(private route: ActivatedRoute, private router: Router) {
    this.usuario = new Usuario('', '', '', '', '', '', 0, null);
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state && nav.extras.state['usuario']) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      this.router.navigate(['/login']);
    });
  }

  public recuperarRespuesta(): void {
    if (this.usuario) {
      // Trae al usuario en base a la respuesta
      const usu: Usuario | undefined = this.usuario.buscarRespuesta(this.usuario.correo, this.respuesta);
  
      if (usu) {
        console.log('Contraseña enviada:', usu.password);
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu,
            contrasena: usu.password  // Pasa la contraseña del usuario
          }
        };
        this.router.navigate(['/correcto'], navigationExtras);
      } else {
        this.router.navigate(['/incorrecto']);
      }
    }
  }
  
}
