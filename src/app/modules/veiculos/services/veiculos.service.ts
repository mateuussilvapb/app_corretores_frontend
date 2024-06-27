//Angular
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Internos
import { Veiculo } from 'src/app/shared/model/veiculo';
import { removeNullValues } from 'src/app/utils/extras/object.utils';
import { AbstractService } from 'src/app/shared/services/abstract.service';

@Injectable({
  providedIn: 'root',
})
export class VeiculosService extends AbstractService<Veiculo> {
  protected override path = (): string => 'veiculos';

  constructor(http: HttpClient) {
    super(http);
  }

  public findVeiculosByFilters = (filters?: any): Observable<Veiculo[]> => {
    return this.http.get<Veiculo[]>(`${this.baseURL}/filters`, {
      params: removeNullValues(filters),
    });
  };
}
