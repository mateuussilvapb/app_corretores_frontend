//Angular
import { Component, OnInit } from '@angular/core';

//Externos
import { PrimeNGConfig } from 'primeng/api';

//Internos
import { Opcoes } from './config/primeNG/traducao.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation(Opcoes.traducaoPtBr);
  }
}
