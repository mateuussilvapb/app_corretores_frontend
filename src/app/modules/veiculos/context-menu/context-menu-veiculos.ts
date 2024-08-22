//Angular
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Externos
import { Menu } from 'primeng/menu';
import { KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

//Internos
import { ROLES } from 'src/app/shared/model/roles';
import { Veiculo } from 'src/app/shared/model/veiculo';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ContextMenu } from 'src/app/shared/context-menu/context-menu';
import { VeiculosService } from 'src/app/modules/veiculos/services/veiculos.service';
import { CorretoresVeiculosService } from 'src/app/shared/services/corretores-veiculos.service';
import { DialogAtribuicaoTemporariaComponent } from 'src/app/shared/components/dialog-atribuicao-temporaria/dialog-atribuicao-temporaria.component';
import { FooterDialogAtribuicaoTemporariaComponent } from 'src/app/shared/components/dialog-atribuicao-temporaria/footer-dialog-atribuicao-temporaria/footer-dialog-atribuicao-temporaria.component';

export interface ContextMenuVeiculosData {
  veiculo: Veiculo;
}

export class ContextMenuVeiculos extends ContextMenu<ContextMenuVeiculosData> {
  public form: FormGroup;

  private ref: DynamicDialogRef | undefined;

  constructor(
    actionMenu: Menu,
    private readonly fb: FormBuilder,
    keycloakService: KeycloakService,
    private readonly refresh$: Subject<void>,
    private readonly dialogService: DialogService,
    private readonly layoutService: LayoutService,
    private readonly messageService: MessageService,
    private readonly veiculosService: VeiculosService,
    private readonly confirmationService: ConfirmationService,
    private readonly corretoresVeiculosService: CorretoresVeiculosService
  ) {
    super(actionMenu, keycloakService);
    this.form = this.fb.group({
      corretor: [null, Validators.required],
      veiculo: [null, Validators.required],
    });
  }

  protected override menuItems = (data: ContextMenuVeiculosData) => [
    {
      id: 'visualizar',
      label: 'Visualizar',
      icon: 'pi pi-search',
      url: `${this.baseHref}/veiculos/${data.veiculo.idString}/visualizar`,
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      id: 'editar',
      label: 'Editar',
      icon: 'pi pi-pen-to-square',
      url: `${this.baseHref}/veiculos/${data.veiculo.idString}/editar`,
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      id: 'atribuicaoTemporaria',
      label: 'Atribuição Temporária',
      icon: 'pi pi-user-plus',
      command: () => this.onAtribuicaoTemporaria(data),
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE],
    },
    {
      id: 'excluir',
      label: 'Excluir',
      icon: 'pi pi-trash',
      command: () => this.onExcluirVeiculo(data.veiculo.idString),
      rolesAllowed: [ROLES.ADMIN, ROLES.MANAGER],
    },
  ];

  private onExcluirVeiculo(id: string): void {
    this.corretoresVeiculosService
      .getCorretorVeiculoAtualByVeiculoId(id)
      .subscribe(corretorVeiculo => {
        if (corretorVeiculo) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail:
              'Não é possível excluir um veículo atribuído a um corretor. Desvincule o veículo do corretor antes de excluí-lo.',
            life: 5000,
          });
        } else {
          this.confirmationService.confirm({
            message:
              'Tem certeza que deseja excluir este veículo? A ação não poderá ser desfeita.',
            header: 'Confirma?',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => this.excluirVeiculo(id),
          });
        }
      });
  }

  private excluirVeiculo(id: string): void {
    this.veiculosService.delete(id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Veículo excluído com sucesso.',
        life: 5000,
      });
      this.refresh$.next();
    });
  }

  private onAtribuicaoTemporaria(data: ContextMenuVeiculosData): void {
    this.ref = this.dialogService.open(DialogAtribuicaoTemporariaComponent, {
      width: this.layoutService.isBigDesktop ? '30vw' : '50vw',
      height: '100vh',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      closeOnEscape: true,
      contentStyle: { overflow: 'auto' },
      maximizable: this.layoutService.isMobile,
      data: { data: data.veiculo, form: this.form },
      header: `Atribuição Temporária - ${data.veiculo.placa}`,
      templates: {
        footer: FooterDialogAtribuicaoTemporariaComponent,
      },
    });
  }
}
