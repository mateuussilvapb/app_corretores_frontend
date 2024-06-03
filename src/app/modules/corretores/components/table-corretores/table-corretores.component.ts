//Angular
import { BehaviorSubject } from 'rxjs';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

//Externos
import { KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';

//Internos
import { Vale } from 'src/app/shared/model/vale';
import { Corretor } from 'src/app/shared/model/corretor';
import { CorretoresService } from 'src/app/modules/corretores/services/corretores.service';
import { ContextMenuCorretores } from 'src/app/modules/corretores/context-menu/context-menu-corretores';

@Component({
  selector: 'app-table-corretores',
  standalone: false,
  templateUrl: './table-corretores.component.html',
})
export class TableCorretoresComponent implements AfterViewInit {
  @Input() corretores: Corretor[] = [];
  @Input() refresh$: BehaviorSubject<void>;
  @ViewChild('actionMenu', { static: true }) actionMenu: any;

  private contextMenu: ContextMenuCorretores;

  constructor(
    private readonly messageService: MessageService,
    private readonly keycloakService: KeycloakService,
    private readonly corretoresService: CorretoresService,
    private readonly confirmationService: ConfirmationService
  ) { }

  ngAfterViewInit(): void {
    this.contextMenu = new ContextMenuCorretores(
      this.actionMenu,
      this.keycloakService,
      this.refresh$,
      this.messageService,
      this.corretoresService,
      this.confirmationService
    );
  }

  public getTotalVales(vales: Vale[]): number {
    return vales.reduce((acc, vale) => acc + vale.valor, 0);
  }

  public onToggleMenu(event: MouseEvent, corretor: Corretor) {
    this.contextMenu.toggle(event, { corretor });
  }
}
