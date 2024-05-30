//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Externos
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

//Internos
import { SharedModule } from 'src/app/shared/shared.module';
import { CorretoresRoutingModule } from './corretores-routing.module';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { AdicaoCorretorComponent } from './pages/adicao-corretor/adicao-corretor.component';
import { SemDadosComponent } from 'src/app/shared/components/sem-dados/sem-dados.component';
import { TableCorretoresComponent } from './components/table-corretores/table-corretores.component';
import { ListagemCorretoresComponent } from './pages/listagem-corretores/listagem-corretores.component';
import { FormControlErrorsComponent } from 'src/app/shared/components/form-control-errors/form-control-errors.component';
import { AutocompleteCorretoresComponent } from 'src/app/shared/components/autocomplete-corretores/autocomplete-corretores.component';

@NgModule({
  declarations: [
    AdicaoCorretorComponent,
    TableCorretoresComponent,
    ListagemCorretoresComponent,
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
    FieldsetModule,
    CalendarModule,
    InputTextModule,
    InputMaskModule,

    //Internos
    SharedModule,
    LoadingComponent,
    SemDadosComponent,
    CorretoresRoutingModule,
    FormControlErrorsComponent,
    AutocompleteCorretoresComponent,
  ],
})
export class CorretoresModule {}
