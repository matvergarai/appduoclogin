  import { Persona } from "./persona";
  import { NivelEducacional } from "./nivel-educacional";

  export class Usuario extends Persona {  // Se inicia la clase usuario

    public correo: string;            // Propiedades de la clase 
    public password: string;
    public preguntaSecreta: string;
    public respuestaSecreta: string;

    constructor(correo: string, password: string, preguntaSecreta: string, respuestaSecreta: string
        , nombre: string, apellido: string, idNivelEducacional: number
        , fechaNacimiento: Date | null) {  // constructor,  inicializa una instancia de Usuario con las propiedades proporcionadas.
      super();
      this.correo = correo;
      this.password = password;
      this.preguntaSecreta = preguntaSecreta;
      this.respuestaSecreta = respuestaSecreta;
      this.setPersona(nombre, apellido, idNivelEducacional, fechaNacimiento);
    }

    public getCorreo(): string {  // metodos getters, proporcionan acceso a las propiedades del usuario.
      return this.correo;
    }

    public getPassword(): string {
      return this.password;
    }

    public getRespuesta(): string {
      return this.respuestaSecreta;
    }

    public setUsuario(correo: string, password: string): void { // metodos setter, permite actualizar el correo y la contraseña del usuario.
      this.correo = correo;
      this.password = password;
    }

    public setNivelEducacional(id: number): void {  //permite asignar un nivel educacional al usuario, buscando el nivel educacional por su ID. 
      //Si no se encuentra un nivel educacional válido, se lanza una excepción.
      const nived = NivelEducacional.findNivelEducacionalById(id);
      if (nived === undefined) {
        throw new Error(`No existe el nivel educacional ${id}`);
      } else {
        this.nivelEducacional = nived;
      }
    }

    public listaUsuariosValidos(): Usuario[] { // lista de usuarios válidos con información predefinida.
      const lista = [];
      lista.push(new Usuario(
          'sin.datos@duocuc.cl'
        , '1234'
        , ''
        , ''
        , ''
        , ''
        , 0
        , null));
      lista.push(new Usuario(
          'giovanni@duocuc.cl'
        , '1234'
        , '¿Cuál es tu animal favorito?'
        , 'gato'
        , 'Giovanni'
        , 'Gutierrez'
        , 5
        , new Date(2000, 1, 1)));
      lista.push(new Usuario(
          'matias@duocuc.cl'
        , '5678'
        , '¿Cuál es tu postre favorito?'
        , 'torta'
        , 'Matias'
        , 'Vergara'
        , 6
        , new Date(2000, 2, 1)));
      lista.push(new Usuario(
          'cmujica@duocuc.cl'
        , '0987'
        , '¿Cuál es tu vehículo favorito?'
        , 'moto'
        , 'Carla'
        , 'Mujica'
        , 7
        , new Date(2000, 3, 1)));
      return lista;
    }
    
    // Ingresa correo y contraseña y si existen en la lista, devuelve el usuario encontrado, si no, undefined
    public buscarUsuarioValido(correo: string, password: string): Usuario | undefined {
      const nived: Usuario | undefined = this.listaUsuariosValidos().find(
        usu => usu.correo === correo && usu.password === password);
      return nived;
    }


    // metodos de validacion 
    public validarCorreo(): string { //formato
      const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (patronCorreo.test(this.correo)) {
        return '';
      } else {
        return 'El correo ingresado no tiene un formato válido.';
      }
    }

    public validarPassword(): string { //numerica y de 4 digitos
      if (this.password.trim() === '') {
        return 'Para entrar al sistema debe ingresar una contraseña.';
      }
      for(let i = 0; i < this.password.length; i++) {
        if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
          return 'La contraseña debe ser numérica.';
        }
      }
      if (this.password.length !== 4) {
        return 'La contraseña debe ser numérica de 4 dígitos.';
      }
      return '';
    }

    public validarCredenciales(): string { // valida si las credenciales pertenecen a un usuario de la lista
      const usu: Usuario | undefined = this.buscarUsuarioValido(this.correo, this.password);
      return usu? '' : 'El usuario no fue encontrado en el sistema.';
    }

    public validarUsuario(): string { // Combina las validaciones anteriores y devuelve un mensaje de error si alguna de las validaciones falla.
      return this.validarCorreo() || this.validarPassword() || this.validarCredenciales();
    }

    public buscarCorreoValido(correo: string): Usuario | undefined { //busca usuario valido por correo, o por correo y respuesta secreta
      const nived: Usuario | undefined = this.listaUsuariosValidos().find(
        usu => usu.correo === correo);
      return nived;
    }

    public buscarRespuesta(correo: string, respuesta: string): Usuario | undefined {
      const nived: Usuario | undefined = this.listaUsuariosValidos().find(
        usu => usu.correo === correo && usu.respuestaSecreta === respuesta);
      return nived;
    }
  }