//Angular
import { FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

//Externos
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

//Internos
import { CorretorVeiculoByCorretorDTO } from '../../model/corretor-veiculo-by-corretor-DTO';

@Component({
  standalone: false,
  selector: 'app-dialog-desatribuir-veiculo',
  templateUrl: './dialog-desatribuir-veiculo.component.html',
})
export class DialogDesatribuirVeiculoComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public dataMinima: Date;
  public dataAtual: Date = new Date();

  private data: CorretorVeiculoByCorretorDTO | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private dialogService: DialogService
  ) {
    this.data = this.dialogService.getInstance(this.ref).data['data'];
    this.form = this.dialogService.getInstance(this.ref).data['form'];
    this.form.get('id').setValue(this.data.idString);
  }

  ngOnInit(): void {
    this.loadConfigDatas();
  }

  private loadConfigDatas() {
    this.dataMinima = new Date(this.data.dataAtribuicao);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close(false);
    }
  }
}
