//Angular
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface LayoutState {
  mainMenuVisible: boolean;
  sidebarMenuOptionsVisible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private menuToggle = new Subject<boolean>();
  public menuToggle$ = this.menuToggle.asObservable();

  public state: LayoutState = {
    mainMenuVisible: this.isDesktop,
    sidebarMenuOptionsVisible: false,
  };

  constructor() {}

  showMobileSidebar() {
    this.state.sidebarMenuOptionsVisible = true;
  }

  onMenuToggle() {
    this.state.mainMenuVisible = !this.state.mainMenuVisible;
    this.menuToggle.next(this.state.mainMenuVisible);
  }

  get isDesktop() {
    return window.innerWidth > 991;
  }

  get isMobile() {
    return !this.isDesktop;
  }

  get mainMenuVisible() {
    return this.state.mainMenuVisible;
  }

  set mainMenuVisible(_val: boolean) {
    this.state.mainMenuVisible = _val;
  }
}
