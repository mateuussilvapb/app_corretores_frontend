import { Corretor } from './corretor';

export interface CorretorVeiculoByCorretorDTO {
  idString: string;
  corretor: Corretor;
  dataDevolucao: Date;
  dataAtribuicao: Date;
}
