//Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//Internos
import { CpfCnpjPipe } from "./pipes/cpf-cnpj.pipe";

@NgModule({
  declarations: [CpfCnpjPipe],
  imports: [
    //Angular
    CommonModule,

    //Externos

    //Internos
  ],
  exports: [CpfCnpjPipe],
})
export class SharedModule { }
