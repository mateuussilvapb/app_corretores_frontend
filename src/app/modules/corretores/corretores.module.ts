//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Externos
import { CardModule } from 'primeng/card';

//Internos
import { CorretoresRoutingModule } from './corretores-routing.module';
import { CorretoresComponent } from './pages/corretores/corretores.component';
import { MainContentComponent } from 'src/app/core/components/main-content/main-content.component';

@NgModule({
  declarations: [CorretoresComponent],
  imports: [
    //Angular
    CommonModule,

    //Externos
    CardModule,

    //Internos
    MainContentComponent,
    CorretoresRoutingModule,
  ],
})
export class CorretoresModule {}
