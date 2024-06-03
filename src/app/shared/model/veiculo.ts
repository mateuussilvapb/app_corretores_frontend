import { Vencimento } from './vencimento';

export interface Veiculo {
  id: string;
  placa: string;
  modelo: string;
  marca: string;
  vencimentoDocumento: Vencimento;
  vencimentoSeguro: Vencimento;
  anoFabricacao: string;
  anoModelo: string;
  ufDocumento: string;
  idString: string;
}
