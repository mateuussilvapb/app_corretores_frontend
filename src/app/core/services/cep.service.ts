//Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Internos
import { EnderecoViaCep } from 'src/app/core/models/endereco-viacep';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private readonly http: HttpClient) {}

  private baseURL: string = 'https://viacep.com.br/ws/';

  getEndereco = (cep: string) =>
    this.http.get<EnderecoViaCep>(`${this.baseURL}${cep}/json`);
}
