//Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//Externos
import { ButtonModule } from 'primeng/button';

//Internos
import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    //Angular
    RouterModule,

    //Externos
    ButtonModule,

    //Internos
    CoreRoutingModule,
  ],
  providers: [],
  bootstrap: [],
})
export class CoreModule {}
