//Angular
import { Component } from '@angular/core';

//Internos
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(public readonly layoutService: LayoutService) {}
}
