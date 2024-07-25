//Angular
import { Component, Input, OnInit } from '@angular/core';

//Internos
import { CorretorVeiculoDTO } from 'src/app/shared/model/corretor-veiculo-DTO';
import { CorretorVeiculoByCorretorID } from 'src/app/shared/model/corretor-veiculo';

@Component({
  selector: 'app-listar-veiculos-corretor',
  standalone: false,
  templateUrl: './listar-veiculos-corretor.component.html',
})
export class ListarVeiculosCorretorComponent implements OnInit {
  @Input() data: CorretorVeiculoByCorretorID;

  public get header() {
    return `Veículos - ${this.data.corretor.nome}`;
  }

  constructor() {}

  ngOnInit(): void {}

  public getBackgroudClassRow(veiculo: CorretorVeiculoDTO): string {
    if (veiculo.dataDevolucao !== null) {
      return 'bg-green-100';
    }
    return 'bg-red-100';
  }
}
