import { Veiculo } from './veiculo';
import { Corretor } from './corretor';
import { CorretorVeiculoDTO } from './corretor-veiculo-DTO';

export interface CorretorVeiculo {
  id: string;
  createdAt: Date;
  createdBy: string;
  corretor: Corretor;
  veiculo: Veiculo;
  dataDevolucao: Date | null;
  idString: string;
}

export interface CorretorVeiculoByCorretorID {
  corretor: Corretor;
  historico: Array<CorretorVeiculoDTO>;
}
