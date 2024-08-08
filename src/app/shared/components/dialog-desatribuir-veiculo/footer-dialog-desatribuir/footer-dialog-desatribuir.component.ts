//Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, finalize, take } from 'rxjs';

//Externos
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

//Internos
import { CorretoresVeiculosService } from 'src/app/shared/services/corretores-veiculos.service';

@Component({
  selector: 'app-footer-dialog-desatribuir-veiculo',
  standalone: false,
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
          label="Desatribuir"
          styleClass="w-full"
          (onClick)="onDesatribuirVeiculo()"
          [disabled]="form.invalid"
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
export class FooterDialogDesatribuirVeiculoComponent {
  public form: FormGroup;
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly corretoresVeiculosService: CorretoresVeiculosService
  ) {
    this.form = this.dialogService.getInstance(this.ref).data['form'];
  }

  public onDesatribuirVeiculo() {
    this.loading$.next(true);
    if (this.form) {
      this.corretoresVeiculosService
        .desatribuirVeiculo(this.form.value)
        .pipe(
          take(1),
          finalize(() => this.loading$.next(false))
        )
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: `O veículo foi desatribuído com sucesso.`,
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
