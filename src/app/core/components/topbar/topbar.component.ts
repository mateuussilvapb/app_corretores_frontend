//Angular
import { Component, EventEmitter, Output } from '@angular/core';

//Internos
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Output() toggle = new EventEmitter();

  constructor(public readonly layoutService: LayoutService) {}
}
