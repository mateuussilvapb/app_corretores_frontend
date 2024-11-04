//Angular
import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Externos
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

//Internos
import { LayoutService } from 'src/app/core/services/layout.service';
import { CorretorVeiculoByCorretorDTO } from 'src/app/shared/model/corretor-veiculo-by-corretor-DTO';
import { DialogDesatribuirVeiculoComponent } from 'src/app/shared/components/dialog-desatribuir-veiculo/dialog-desatribuir-veiculo.component';
import { FooterDialogDesatribuirVeiculoComponent } from 'src/app/shared/components/dialog-desatribuir-veiculo/footer-dialog-desatribuir/footer-dialog-desatribuir.component';

@Component({
  standalone: false,
  selector: 'app-dados-corretor-accordion',
  templateUrl: './dados-corretor-accordion.component.html',
})
export class DadosCorretorAccordionComponent implements OnInit, OnDestroy {
  @Input() public corretores: Array<CorretorVeiculoByCorretorDTO>;
  @Input() public refresh$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private form: FormGroup;
  private ref: DynamicDialogRef | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogService: DialogService,
    private readonly layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public onDesatribuirCorretor(corretor: CorretorVeiculoByCorretorDTO) {
    this.ref = this.dialogService.open(DialogDesatribuirVeiculoComponent, {
      width: this.layoutService.isBigDesktop ? '30vw' : '50vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      closeOnEscape: true,
      data: { data: corretor, form: this.form },
      contentStyle: { overflow: 'auto' },
      maximizable: this.layoutService.isMobile,
      header: `Desatribuir veículo de ${corretor.corretor.nome}`,
      templates: {
        footer: FooterDialogDesatribuirVeiculoComponent,
      },
    });

    this.ref.onClose.subscribe(result => {
      if (result) {
        this.refresh$.next(true);
      }
    });
  }

  public classColorAccordion(corretor: CorretorVeiculoByCorretorDTO): string {
    if (corretor.dataDevolucao) {
      return 'text-green-500';
    }
    return 'text-red-500';
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null, Validators.required],
      dataDevolucao: [null, Validators.required],
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
