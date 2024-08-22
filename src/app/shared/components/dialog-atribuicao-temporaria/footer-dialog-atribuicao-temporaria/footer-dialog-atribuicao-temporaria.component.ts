//Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, finalize, take } from 'rxjs';

//Externos
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

//Externos
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { CorretoresVeiculosService } from 'src/app/shared/services/corretores-veiculos.service';

@Component({
  imports: [CommonModule, LoadingComponent, ButtonModule],
  standalone: true,
  selector: 'app-footer-dialog-atribuicao-temporaria',
  template: `
    @if (loading$ | async; as loading){
    <app-loading></app-loading>
    }
    <div
      [hidden]="loading$ | async"
      class="grid grid-nogutter justify-content-end"
    >
      <div class="col-12 md:col-3 xl:col-4 md:mt-0">
        <p-button
          type="submit"
          class="w-full"
          label="Atribuir"
          styleClass="w-full"
          [disabled]="form.invalid"
          (onClick)="onAtribuirVeiculo()"
        />
      </div>
      <div class="col-12 ml-0 mt-2 md:ml-2 md:col-3 xl:col-4 md:mt-0">
        <p-button
          label="Voltar"
          class="w-full"
          severity="warning"
          styleClass="w-full"
          (onClick)="onVoltar()"
        />
      </div>
    </div>
  `,
})
export class FooterDialogAtribuicaoTemporariaComponent {
  public form: FormGroup | undefined;
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly corretoresVeiculosService: CorretoresVeiculosService
  ) {
    this.form = this.dialogService.getInstance(this.ref).data['form'];
  }

  public onAtribuirVeiculo() {
    this.loading$.next(true);
    if (this.form) {
      this.corretoresVeiculosService
        .create(this.form.value)
        .pipe(
          take(1),
          finalize(() => this.loading$.next(false))
        )
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: `O veículo foi atribuído com sucesso.`,
            life: 5000,
          });
          this.ref.close(true);
        });
    }
  }

  public onVoltar() {
    this.ref.close(false);
  }
}
