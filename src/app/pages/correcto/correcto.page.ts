import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { Asistencia } from 'src/app/model/asistencia';
import jsQR, { QRCode } from 'jsqr';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
    @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
    @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
    @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
    @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
    @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;
  
    public usuario: Usuario;
    public idNivelEducacional: number;
    public datosCodigoQR: string = '';
    public nivelesEducacionales: NivelEducacional[] = NivelEducacional.getNivelesEducacionales();
  
    public sede: string = '';
    public idAsignatura: string = '';
    public seccion: string = '';
    public nombreAsignatura: string = '';
    public nombreProfesor: string = '';
    public dia: string = '';
    public bloqueInicio: number = 0;
    public bloqueTermino: number = 0;
    public horaInicio: string = '';
    public horaFin: string = '';
    
  
    constructor(
      private activeroute: ActivatedRoute,
      private router: Router,
      private alertController: AlertController,
      private animationController: AnimationController
    ) {
      this.usuario = new Usuario('', '', '', '', '', '', 0, null);
      this.idNivelEducacional = 0;
  
      this.activeroute.queryParams.subscribe(params => {
        const nav = this.router.getCurrentNavigation();
        if (nav) {
          if (nav.extras.state) {
            this.usuario = nav.extras.state['usuario'];
            if (this.usuario.nivelEducacional !== undefined) {
              this.idNivelEducacional = this.usuario.nivelEducacional.id;
            }
            return;
          }
        }
        this.router.navigate(['/login']);
      });
    }  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
