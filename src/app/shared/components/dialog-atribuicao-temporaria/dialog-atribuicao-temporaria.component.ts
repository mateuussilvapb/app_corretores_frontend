//Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

//Externos
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

//Internos
import { Veiculo } from 'src/app/shared/model/veiculo';
import { AutocompleteCorretoresComponent } from 'src/app/shared/components/autocomplete-corretores/autocomplete-corretores.component';

@Component({
  imports: [CommonModule, AutocompleteCorretoresComponent],
  standalone: true,
  selector: 'app-dialog-atribuicao-temporaria',
  template: `
    <section class="mt-2">
      <app-autocomplete-corretores
        [control]="corretorFormControl"
      ></app-autocomplete-corretores>
    </section>
  `,
})
export class DialogAtribuicaoTemporariaComponent {
  private data: Veiculo | undefined;
  public form: FormGroup | undefined;

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly dialogService: DialogService
  ) {
    this.data = this.dialogService.getInstance(this.ref).data['data'];
    this.form = this.dialogService.getInstance(this.ref).data['form'];
    this.form?.patchValue({ veiculo: this.data.idString });
  }

  get corretorFormControl(): FormControl {
    return this.form.get('corretor') as FormControl;
  }
}
