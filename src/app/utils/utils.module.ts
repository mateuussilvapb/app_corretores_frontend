//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Externos
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

//Internos
import { ToastComponent } from 'src/app/utils/components/toast/toast.component';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    //Internos
    CommonModule,

    //Externos
    ToastModule,
    ButtonModule,
  ],
  exports: [ToastComponent],
})
export class UtilsModule {}
