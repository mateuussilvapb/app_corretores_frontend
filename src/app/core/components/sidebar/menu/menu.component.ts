//Angular
import { Component } from '@angular/core';

//Internos
import { ItensMenu } from './itens-menu';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  get itensMenu() {
    return ItensMenu;
  }
}
