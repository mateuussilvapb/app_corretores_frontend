//Angular
import { Component, Input, OnInit } from '@angular/core';

//Internos
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
}
