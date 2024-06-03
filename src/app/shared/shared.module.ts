//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Internos
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { FormatVencimentoPipe } from './pipes/format-vencimento.pipe';

@NgModule({
  declarations: [CpfCnpjPipe, FormatVencimentoPipe],
  imports: [
    //Angular
    CommonModule,

    //Externos

    //Internos
  ],
  exports: [CpfCnpjPipe, FormatVencimentoPipe],
})
export class SharedModule {}
