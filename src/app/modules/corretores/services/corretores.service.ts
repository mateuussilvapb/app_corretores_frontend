//Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Internos
import { Corretor } from 'src/app/shared/model/corretor';
import { Reference } from 'src/app/shared/model/reference';
import { AbstractService } from 'src/app/shared/services/abstract.service';

@Injectable({
  providedIn: 'root',
})
export class CorretoresService extends AbstractService<Corretor> {
  protected override path = (): string => 'corretores';

  constructor(http: HttpClient) {
    super(http);
  }

  getCorretoresQuery = (term?: any) =>
    this.http.get<Array<Reference<string>>>(`${this.baseURL}/search`, {
      params: {term},
    });
}
