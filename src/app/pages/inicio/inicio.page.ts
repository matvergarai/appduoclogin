import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { Asistencia } from 'src/app/model/asistencia';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})

export class InicioPage implements OnInit, AfterViewInit {
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
  }

  public navegarAMiClase() {
    const navigationExtras: NavigationExtras = {
      state: {
        sede: this.sede,
        idAsignatura: this.idAsignatura,
        seccion: this.seccion,
        nombreAsignatura: this.nombreAsignatura,
        nombreProfesor: this.nombreProfesor,
        dia: this.dia,
        bloqueInicio: this.bloqueInicio,
        bloqueTermino: this.bloqueTermino,
        horaInicio: this.horaInicio,
        horaFin: this.horaFin
      }
    };
    this.router.navigate(['/miclase'], navigationExtras);
  }


  cerrarSesion() {
    
    this.router.navigate(['/ingreso']); 
  }

  public cambiarNivelEducacional(): void {
    this.usuario.setNivelEducacional(this.idNivelEducacional);
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);

      animation.play();
    }
  }

  public limpiarFormulario(): void {
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.nivelEducacional = undefined;
    this.idNivelEducacional = 0;
    this.usuario.fechaNacimiento = null;

    this.animateItem(this.itemNombre.nativeElement);
    this.animateItem(this.itemApellido.nativeElement);
    this.animateItem(this.itemEducacion.nativeElement);
    this.animateItem(this.itemFechaNacimiento.nativeElement);
  }

  public animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }

  public mostrarDatosPersona(): void {
    if (this.usuario.nombre.trim() === '' && this.usuario.apellido === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    let mensaje = '';
    if (this.usuario) {
      mensaje += '<br><b>Usuario</b>: <br>' + this.usuario.getCorreo();
      mensaje += '<br><b>Nombre</b>: <br>' + this.usuario.getNombre();
      mensaje += '<br><b>Apellido</b>: <br>' + this.usuario.getApellido();
      mensaje += '<br><b>Educación</b>: <br>' + this.usuario.getNivelEducacional();
      mensaje += '<br><b>Nacimiento</b>: <br>' + this.usuario.getFechaNacimiento();

      this.presentAlert('Datos personales', mensaje);
    }
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  public escanear(): void {
    this.router.navigate(['/qrreader']);
  }

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';

  private mediaStream: MediaStream | null = null;

  public ngOnInit(): void {
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public navegarAInicio() {
    this.router.navigate(['/inicio']);
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);
    this.sede = objetoDatosQR.sede;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.seccion = objetoDatosQR.seccion;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.dia = objetoDatosQR.dia;
    this.bloqueInicio = objetoDatosQR.bloqueInicio.toString();
    this.bloqueTermino = objetoDatosQR.bloqueTermino.toString();
    this.horaInicio = objetoDatosQR.horaInicio;
    this.horaFin = objetoDatosQR.horaFin;
    this.datosCodigoQR = datosQR;

    const navigationExtras: NavigationExtras = {
      state: {
        sede: this.sede,
        idAsignatura: this.idAsignatura,
        seccion: this.seccion,
        nombreAsignatura: this.nombreAsignatura,
        nombreProfesor: this.nombreProfesor,
        dia: this.dia,
        bloqueInicio: this.bloqueInicio,
        bloqueTermino: this.bloqueTermino,
        horaInicio: this.horaInicio,
        horaFin: this.horaFin
      }
    };
    this.router.navigate(['/miclase'], navigationExtras);
    this.detenerCamara();
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  private detenerCamara(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }
}