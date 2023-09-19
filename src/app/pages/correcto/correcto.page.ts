import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  contrasena: string='';

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => { // Utiliza 'any' para permitir cualquier propiedad en 'params'
      if (params && params.contrasena) {
        this.contrasena = params.contrasena;
        console.log('Contraseña asignada:', this.contrasena);
        this.cdr.detectChanges(); // Para forzar la actualización de la vista
      }
    });
  }

  buttonClicked() {
    console.log('Botón clickeado');
  }
}
