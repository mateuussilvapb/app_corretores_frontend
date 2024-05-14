//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Internos
import { CorretoresRoutingModule } from './corretores-routing.module';
import { CorretoresComponent } from './pages/corretores/corretores.component';

@NgModule({
  declarations: [CorretoresComponent],
  imports: [
    //Angular
    CommonModule,

    //Internos
    CorretoresRoutingModule,
  ],
})
export class CorretoresModule {}
