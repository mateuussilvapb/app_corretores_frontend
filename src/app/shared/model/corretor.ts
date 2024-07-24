import { Vale } from './vale';
import { Endereco } from './endereco';

export interface Corretor {
  id: number;
  createdAt: string;
  createdBy: string;
  nome: string;
  apelido?: string;
  dataNascimento: string;
  cpf: string;
  endereco: Endereco;
  vales?: Vale[];
  descricao: string;
  identificacao: string;
  idString: string;
}
