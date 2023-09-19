export class NivelEducacional { // define la estructura de un nivel educativo con dos propiedades públicas

  public id: number; 
  public nombre: string;

  constructor(id: number, nombre: string) { // asigna argumentos  y los asigna a las propiedades correspondientes de la instancia de la clase.
    this.id = id;
    this.nombre = nombre;
  }

  public toString(): string { // devuelve una cadena de texto que combina el id y el nombre del nivel educativo
    return `${this.id} - ${this.nombre}`;
  }

  public static findNivelEducacionalById(id: number): NivelEducacional | undefined { // permite buscar un nivel educativo por su id
    return this.getNivelesEducacionales().find(n => n.id === id); // Si lo encuentra, devuelve el nivel educativo; de lo contrario, devuelve undefined.
  }

  public static getNivelesEducacionales(): NivelEducacional[] { // crea y devuelve un arreglo de objetos NivelEducacional
    const nived = [];
    nived.push(new NivelEducacional(1, 'Sin nivel educacional'));
    nived.push(new NivelEducacional(2, 'Básica incompleta'));
    nived.push(new NivelEducacional(3, 'Básica completa'))
    nived.push(new NivelEducacional(4, 'Media incompleta'));
    nived.push(new NivelEducacional(5, 'Media completa'));
    nived.push(new NivelEducacional(6, 'Superior incompleta'));
    nived.push(new NivelEducacional(7, 'Superior completa'));
    return nived;
  }
}