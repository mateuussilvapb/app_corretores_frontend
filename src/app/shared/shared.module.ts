//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Externos
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

//Internos
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { FormatVencimentoPipe } from './pipes/format-vencimento.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { DialogDesatribuirVeiculoComponent } from './components/dialog-desatribuir-veiculo/dialog-desatribuir-veiculo.component';
import { FooterDialogDesatribuirVeiculoComponent } from './components/dialog-desatribuir-veiculo/footer-dialog-desatribuir/footer-dialog-desatribuir.component';

@NgModule({
  declarations: [
    CpfCnpjPipe,
    FormatVencimentoPipe,
    DialogDesatribuirVeiculoComponent,
    FooterDialogDesatribuirVeiculoComponent,
  ],
  imports: [
    //Angular
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    //Externos
    ButtonModule,
    CalendarModule,

    //Internos
    LoadingComponent,
  ],
  exports: [
    CpfCnpjPipe,
    FormatVencimentoPipe,
    DialogDesatribuirVeiculoComponent,
    FooterDialogDesatribuirVeiculoComponent,
  ],
})
export class SharedModule {}
