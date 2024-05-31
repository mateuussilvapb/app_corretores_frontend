//Angular
import { Subject } from 'rxjs';

//Externos
import { Menu } from 'primeng/menu';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';

//Internos
import { ROLES } from 'src/app/shared/model/roles';
import { Corretor } from 'src/app/shared/model/corretor';
import { CorretoresService } from 'src/app/modules/corretores/services/corretores.service';
import {
  ContextMenu,
  MenuItensWithPermissions,
} from 'src/app/shared/context-menu/context-menu';

export interface ContextMenuCorretoresData {
  corretor: Corretor;
}

export class ContextMenuCorretores extends ContextMenu<ContextMenuCorretoresData> {
  constructor(
    actionMenu: Menu,
    keycloakService: KeycloakService,
    private readonly refresh$: Subject<void>,
    private readonly messageService: MessageService,
    private readonly corretoresService: CorretoresService,
    private readonly confirmationService: ConfirmationService
  ) {
    super(actionMenu, keycloakService);
  }

  protected override menuItems = (
    data: ContextMenuCorretoresData
  ): MenuItensWithPermissions[] => [
    {
      id: 'visualizar',
      label: 'Visualizar',
      icon: 'pi pi-search',
      url: `${this.baseHref}/corretores/${data.corretor.id}/visualizar`,
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      id: 'editar',
      label: 'Editar',
      icon: 'pi pi-user-edit',
      url: `${this.baseHref}/corretores/${data.corretor.id}/editar`,
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      id: 'vales',
      label: 'Vales',
      icon: 'pi pi-dollar',
      url: `${this.baseHref}/corretores/${data.corretor.id}/vales`,
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      id: 'veiculos',
      label: 'Veículos',
      icon: 'pi pi-car',
      url: `${this.baseHref}/corretores/${data.corretor.id}/veiculos`,
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      id: 'excluir',
      label: 'Excluir',
      icon: 'pi pi-trash',
      command: () => {
        this.onExcluir(data.corretor.idString);
      },
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
    },
  ];

  private onExcluir(idString: string) {
    this.confirmationService.confirm({
      message:
        'Tem certeza que deseja excluir este corretor? A ação não poderá ser desfeita.',
      header: 'Confirma?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.excluir(idString),
    });
  }

  private excluir(idString: string) {
    this.corretoresService.delete(idString).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Corretor excluído com sucesso.',
        life: 5000,
      });
      this.refresh$.next();
    });
  }
}
