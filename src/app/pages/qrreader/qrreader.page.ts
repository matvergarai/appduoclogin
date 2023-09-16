//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/model/asistencia';
import jsQR, { QRCode } from 'jsqr';
import { Router, NavigationExtras } from '@angular/router'; 


@Component({ //  propiedades y métodos que controlan la lógica de la página.
  selector: 'app-qrreader',
  templateUrl: './qrreader.page.html',
  styleUrls: ['./qrreader.page.scss'],
})
export class QrreaderPage implements OnInit {

  @ViewChild('video')  // propiedades públicas que almacenan información relacionada con el código QR escaneado y los detalles de la asistencia.
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';
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

  private mediaStream: MediaStream | null = null;

  public constructor(private router: Router) { // inyecta una instancia de Router que se utilizará para la navegación en la aplicación.
  }

  public ngOnInit(): void { // se llama cuando el componente se inicializa
  }

  

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({ // acceder a la cámara del dispositivo y configurar el elemento de video para mostrar la vista en tiempo real de la cámara.
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this)); // llamar al método verificarVideo de manera continua.
  }

  
  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) { // verifica el estado del elemento de video y llama al método obtenerDatosQR para procesar la imagen de la cámara en busca de códigos QR
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  

  public obtenerDatosQR(): boolean { // toma una captura de la imagen de la cámara, la procesa utilizando la biblioteca jsQR para identificar un código QR
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
        this.mostrarDatosQROrdenados(qrCode.data); // si lo encuentra, lo interpreta y llama a mostrarDatosQROrdenados.
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void { // recibe los datos del código QR y los muestra en la interfaz de usuario
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);
    this.sede = objetoDatosQR.sede;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.seccion = objetoDatosQR.seccion;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.dia = objetoDatosQR.dia;
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.horaFin = objetoDatosQR.horaFin;

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
    this.router.navigate(['/miclase'], navigationExtras)// para navegar a otra página y pasa los datos como parámetros de navegación.
    this.detenerCamara();
   
  }

  

  public detenerEscaneoQR(): void { // detiene el escaneo de códigos QR estableciendo la propiedad escaneando en false
    this.escaneando = false;
  }

  private detenerCamara(): void { // detener la transmisión de video de la cámara si se está utilizando
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => { 
        track.stop(); //detiene los tracks de la camara.
      });
    }
  }

}
