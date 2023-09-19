import { NivelEducacional } from './nivel-educacional'; // probando clase llamado NivelEducacional

describe('NivelEducacional', () => { // describiendo las pruebas para la clase NivelEducacional
  it('should create an instance', () => { //  probando si se puede crear una instancia de la clase NivelEducacional
    expect(new NivelEducacional()).toBeTruthy(); //  verificando si se puede crear una instancia de NivelEducacional con éxito.
  });
});
