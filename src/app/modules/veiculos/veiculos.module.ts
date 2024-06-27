//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Externos
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

//Internos
import { SharedModule } from 'src/app/shared/shared.module';
import { VeiculosRoutingModule } from './veiculos-routing.module';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SemDadosComponent } from 'src/app/shared/components/sem-dados/sem-dados.component';
import { TableVeiculosComponent } from './components/table-veiculos/table-veiculos.component';
import { ListagemVeiculosComponent } from './pages/listagem-veiculos/listagem-veiculos.component';
import { FormControlErrorsComponent } from 'src/app/shared/components/form-control-errors/form-control-errors.component';
import { AutocompleteCorretoresComponent } from 'src/app/shared/components/autocomplete-corretores/autocomplete-corretores.component';

@NgModule({
  declarations: [ListagemVeiculosComponent, TableVeiculosComponent],
  imports: [
    //Angular
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    //Externos
    MenuModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,

    //Internos
    SharedModule,
    LoadingComponent,
    SemDadosComponent,
    VeiculosRoutingModule,
    FormControlErrorsComponent,
    AutocompleteCorretoresComponent,
  ],
})
export class VeiculosModule {}
