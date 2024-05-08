import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Output() toggle = new EventEmitter();

  public toggleSidenav() {
    this.toggle.emit();
  }
}
