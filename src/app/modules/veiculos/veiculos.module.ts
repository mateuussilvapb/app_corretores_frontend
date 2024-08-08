//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Externos
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { AccordionModule } from 'primeng/accordion';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

//Internos
import { SharedModule } from 'src/app/shared/shared.module';
import { VeiculosRoutingModule } from './veiculos-routing.module';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SemDadosComponent } from 'src/app/shared/components/sem-dados/sem-dados.component';
import { AdicaoVeiculosComponent } from './pages/adicao-veiculos/adicao-veiculos.component';
import { EdicaoVeiculosComponent } from './pages/edicao-veiculos/edicao-veiculos.component';
import { TableVeiculosComponent } from './components/table-veiculos/table-veiculos.component';
import { ListagemVeiculosComponent } from './pages/listagem-veiculos/listagem-veiculos.component';
import { VisualizacaoVeiculosComponent } from './pages/visualizacao-veiculos/visualizacao-veiculos.component';
import { DadosVeiculoComponent } from './pages/visualizacao-veiculos/components/dados-veiculo/dados-veiculo.component';
import { FormControlErrorsComponent } from 'src/app/shared/components/form-control-errors/form-control-errors.component';
import { AutocompleteCorretoresComponent } from 'src/app/shared/components/autocomplete-corretores/autocomplete-corretores.component';
import { DadosCorretorAccordionComponent } from './pages/visualizacao-veiculos/components/dados-corretor-accordion/dados-corretor-accordion.component';

@NgModule({
  declarations: [
    DadosVeiculoComponent,
    TableVeiculosComponent,
    AdicaoVeiculosComponent,
    EdicaoVeiculosComponent,
    ListagemVeiculosComponent,
    VisualizacaoVeiculosComponent,
    DadosCorretorAccordionComponent,
  ],
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
    DividerModule,
    CalendarModule,
    InputTextModule,
    InputMaskModule,
    AccordionModule,
    FloatLabelModule,
    DynamicDialogModule,

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
