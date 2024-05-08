//Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//Internos
import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [RouterModule, CoreRoutingModule],
  providers: [],
  bootstrap: [],
})
export class CoreModule {}
