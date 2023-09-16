import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

 

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {
  // Declarar las propiedades para almacenar los datos del QR
  public sede: string = '';
  public idAsignatura: string = '';
  public seccion: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public dia: string = '';
  public bloqueInicio: string = '';
  public bloqueTermino: string = '';
  public horaInicio: string = '';
  public horaFin: string = '';
  public datosCodigoQR: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          
          this.sede = nav.extras.state['sede'];
          this.idAsignatura = nav.extras.state['idAsignatura'];
          this.seccion = nav.extras.state['seccion'];
          this.nombreAsignatura = nav.extras.state['nombreAsignatura'];
          this.nombreProfesor = nav.extras.state['nombreProfesor'];
          this.dia = nav.extras.state['dia'];
          this.bloqueInicio = nav.extras.state['bloqueInicio'];
          this.bloqueTermino = nav.extras.state['bloqueTermino'];
          this.horaInicio = nav.extras.state['horaInicio'];
          this.horaFin = nav.extras.state['horaFin'];
          return;
        }
      }
      this.router.navigate(['/login']);
    });
  }

  

  public navegarAInicio() {
    this.router.navigate(['/inicio']);
  }
}