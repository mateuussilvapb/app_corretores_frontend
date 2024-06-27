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

@Component({
  selector: 'app-table-veiculos',
  standalone: false,
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
}
