//Angular
import { Component, Input } from '@angular/core';

//Externos
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CardModule],
  templateUrl: './main-content.component.html',
})
export class MainContentComponent {
  @Input() title: string = '';
}
