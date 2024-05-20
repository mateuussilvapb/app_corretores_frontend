//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Externos
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

//Internos
import { CorretoresRoutingModule } from './corretores-routing.module';
import { CorretoresComponent } from './pages/corretores/corretores.component';
import { MainContentComponent } from 'src/app/core/components/main-content/main-content.component';
import { AutocompleteCorretoresComponent } from 'src/app/shared/components/autocomplete-corretores/autocomplete-corretores.component';

@NgModule({
  declarations: [CorretoresComponent],
  imports: [
    //Angular
    CommonModule,

    //Externos
    CardModule,
    ButtonModule,

    //Internos
    MainContentComponent,
    CorretoresRoutingModule,
    AutocompleteCorretoresComponent,
  ],
})
export class CorretoresModule {}
