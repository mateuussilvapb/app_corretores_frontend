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
  styles: [
    `
      .vencido {
        background-color: #ef6167;
      }
      .vencimento-10-dias {
        background-color: #f3a066;
      }
      .vencimento-30-dias {
        background-color: #faf265;
      }
      .vencimento-60-dias {
        background-color: #52b4e4;
      }
      .vencimento-maior-60-dias {
        background-color: #ffffff;
      }
    `,
  ],
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
      return 'vencido';
    } else if (vencimento > 0 && vencimento <= 10) {
      return 'vencimento-10-dias';
    } else if (vencimento > 10 && vencimento <= 30) {
      return 'vencimento-30-dias';
    } else if (vencimento > 30 && vencimento <= 60) {
      return 'vencimento-60-dias';
    } else {
      return 'vencimento-maior-60-dias';
    }
  }
}
