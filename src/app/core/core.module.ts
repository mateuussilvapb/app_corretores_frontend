//Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//Externos
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

//Internos
import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent } from './components/sidebar/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarMobileComponent } from './components/topbar/sidebar-mobile/sidebar-mobile.component';
import { TopbarMenuOptionsComponent } from './components/topbar/topbar-menu-options/topbar-menu-options.component';

@NgModule({
  declarations: [
    MenuComponent,
    LayoutComponent,
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    SidebarMobileComponent,
    TopbarMenuOptionsComponent,
  ],
  imports: [
    //Angular
    RouterModule,
    CommonModule,

    //Externos
    ButtonModule,
    SidebarModule,

    //Internos
    CoreRoutingModule,
  ],
  providers: [],
  bootstrap: [],
})
export class CoreModule {}
