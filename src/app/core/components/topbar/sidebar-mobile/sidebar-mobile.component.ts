//Angular
import { Component } from '@angular/core';

//Internos
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: false,
  templateUrl: './sidebar-mobile.component.html',
})
export class SidebarMobileComponent {
  constructor(public readonly layoutService: LayoutService) {}

  get visible(): boolean {
    return this.layoutService.state.sidebarMenuOptionsVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.sidebarMenuOptionsVisible = _val;
  }
}
