//Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Internos
import {
  CorretorVeiculo,
  CorretorVeiculoByCorretorID,
} from 'src/app/shared/model/corretor-veiculo';
import { AbstractService } from './abstract.service';
import { CorretorVeiculoGroupByVeiculoDTO } from '../model/corretor-veiculo-group-by-veiculo-DTO';

@Injectable({
  providedIn: 'root',
})
export class CorretoresVeiculosService extends AbstractService<CorretorVeiculo> {
  protected override path = (): string => 'corretores-veiculos';

  constructor(http: HttpClient) {
    super(http);
  }

  getVeiculosCorretor = (id: string) =>
    this.http.get<CorretorVeiculoByCorretorID>(
      `${this.baseURL}/historico/corretor/${id}`
    );

  getCorretorVeiculoAtualByVeiculoId = (id: string) =>
    this.http.get<CorretorVeiculo>(`${this.baseURL}/veiculo/${id}`);

  getCorretorVeiculoGroupByCorretorByVeiculoId = (id: string) =>
    this.http.get<CorretorVeiculoGroupByVeiculoDTO>(
      `${this.baseURL}/veiculo/${id}/historico-corretores`
    );

  desatribuirVeiculo(data: any) {
    return this.http.put(
      `${this.baseURL}/${data.id}/devolucao`,
      data.dataDevolucao
    );
  }
}
