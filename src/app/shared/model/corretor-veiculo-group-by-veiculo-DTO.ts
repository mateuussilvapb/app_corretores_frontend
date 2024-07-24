import { Veiculo } from './veiculo';
import { CorretorVeiculoByCorretorDTO } from './corretor-veiculo-by-corretor-DTO';

export interface CorretorVeiculoGroupByVeiculoDTO {
  veiculo: Veiculo;
  corretores: Array<CorretorVeiculoByCorretorDTO>;
}
