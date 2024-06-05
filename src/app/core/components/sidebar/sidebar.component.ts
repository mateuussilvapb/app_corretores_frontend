//Angular
import { Subscription, filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

//Internos
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('100ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('100ms', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  private routerSubscription: Subscription;

  constructor(
    private readonly router: Router,
    public readonly layoutService: LayoutService
  ) {}

  public get showMenuDesktop() {
    return this.layoutService.isDesktop && this.layoutService.mainMenuVisible;
  }

  public get showMenuMobile() {
    debugger;
    return this.layoutService.isMobile && this.layoutService.mainMenuVisible;
  }

  set showMenuMobile(_val: boolean) {
    this.layoutService.mainMenuVisible = _val;
  }

  set showMenuDesktop(_val: boolean) {
    this.layoutService.mainMenuVisible = _val;
  }

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.layoutService.isMobile) {
          this.layoutService.mainMenuVisible = false;
        }
      });
  }
}
