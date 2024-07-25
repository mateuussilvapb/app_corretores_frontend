//Angular
import { BehaviorSubject } from 'rxjs';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

//Externos
import { KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';

//Internos
import { Veiculo } from 'src/app/shared/model/veiculo';
import { VeiculosService } from 'src/app/modules/veiculos/services/veiculos.service';
import { CorretoresVeiculosService } from 'src/app/shared/services/corretores-veiculos.service';
import { ContextMenuVeiculos } from 'src/app/modules/veiculos/context-menu/context-menu-veiculos';
import { Vencimento } from 'src/app/shared/model/vencimento';
import { isVencimentoProximo } from 'src/app/utils/extras/date.utils';

@Component({
  standalone: false,
  selector: 'app-table-veiculos',
  templateUrl: './table-veiculos.component.html',
})
export class TableVeiculosComponent implements AfterViewInit {
  @Input() veiculos: Array<Veiculo> = [];
  @Input() refresh$: BehaviorSubject<void>;
  @ViewChild('actionMenu', { static: true }) actionMenu: any;

  private contextMenu: ContextMenuVeiculos;

  constructor(
    private readonly messageService: MessageService,
    private readonly keycloakService: KeycloakService,
    private readonly veiculosService: VeiculosService,
    private readonly confirmationService: ConfirmationService,
    private readonly corretoresVeiculosService: CorretoresVeiculosService
  ) {}

  ngAfterViewInit(): void {
    this.contextMenu = new ContextMenuVeiculos(
      this.actionMenu,
      this.keycloakService,
      this.refresh$,
      this.messageService,
      this.veiculosService,
      this.confirmationService,
      this.corretoresVeiculosService
    );
  }

  public onToggleMenu(event: MouseEvent, veiculo: Veiculo) {
    this.contextMenu.toggle(event, { veiculo });
  }

  public verificaDiferencaDatas(
    vencimentoDocumento: Vencimento,
    vencimentoSeguro: Vencimento
  ): number {
    if (vencimentoSeguro.dia == 0 || vencimentoSeguro.mes == 0) {
      return isVencimentoProximo(vencimentoDocumento);
    }
    const seguro = isVencimentoProximo(vencimentoSeguro);
    const documento = isVencimentoProximo(vencimentoDocumento);
    if (seguro < documento) {
      return seguro;
    }
    return documento;
  }

  public getClassVencimento(
    vencimentoDocumento: Vencimento,
    vencimentoSeguro: Vencimento
  ): string {
    const vencimento = this.verificaDiferencaDatas(
      vencimentoDocumento,
      vencimentoSeguro
    );
    if (vencimento === 0) {
      return 'bg-red-400';
    } else if (vencimento > 0 && vencimento <= 10) {
      return 'bg-orange-300';
    } else if (vencimento > 10 && vencimento <= 30) {
      return 'bg-yellow-200';
    } else if (vencimento > 30 && vencimento <= 60) {
      return 'bg-green-100';
    } else {
      return 'bg-white';
    }
  }
}
