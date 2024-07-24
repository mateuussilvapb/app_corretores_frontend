import { Component, Input } from '@angular/core';
import { CorretorVeiculoByCorretorDTO } from 'src/app/shared/model/corretor-veiculo-by-corretor-DTO';

@Component({
  standalone: false,
  selector: 'app-dados-corretor-accordion',
  templateUrl: './dados-corretor-accordion.component.html',
})
export class DadosCorretorAccordionComponent {
  @Input() public corretorItem: CorretorVeiculoByCorretorDTO;

  public classColorAccordion(corretor: CorretorVeiculoByCorretorDTO): string {
    if (corretor.dataDevolucao) {
      return 'text-green-500';
    }
    return 'text-red-500';
  }
}
