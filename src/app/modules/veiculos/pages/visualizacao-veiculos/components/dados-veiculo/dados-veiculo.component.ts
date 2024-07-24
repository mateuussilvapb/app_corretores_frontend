import { Component, Input } from '@angular/core';
import { Veiculo } from 'src/app/shared/model/veiculo';

@Component({
  standalone: false,
  selector: 'app-dados-veiculo',
  templateUrl: './dados-veiculo.component.html',
})
export class DadosVeiculoComponent {
  @Input() veiculo: Veiculo;
}
