//Angular
import { Component } from '@angular/core';

//Internos
import { LayoutService } from 'src/app/core/services/layout.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-topbar-menu-options',
  standalone: false,
  template: `
    <button
      pButton
      pRipple
      [outlined]="true"
      class="menu-buttons"
      severity="secondary"
      [icon]="this.themeService.getIconTheme"
      (click)="this.themeService.switchTheme()"
    ></button>

    <button
      pButton
      pRipple
      icon="pi pi-user"
      [outlined]="true"
      severity="secondary"
      class="menu-buttons"
      [ngClass]="{
        'ml-2': this.layoutService.isDesktop,
        'mt-2': !this.layoutService.isDesktop,
      }"
    ></button>
  `,
})
export class TopbarMenuOptionsComponent {
  constructor(
    public readonly themeService: ThemeService,
    public readonly layoutService: LayoutService
  ) {}
}
