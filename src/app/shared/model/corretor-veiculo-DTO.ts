import { Veiculo } from "./veiculo";

export interface CorretorVeiculoDTO {
  idString: string;
  veiculo: Veiculo;
  dataDevolucao: Date | null;
  dataAtribuicao: Date;
}
