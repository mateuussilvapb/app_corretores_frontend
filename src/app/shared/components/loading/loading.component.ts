//Angular
import { Component } from '@angular/core';

//Externos
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ProgressSpinnerModule],
  template: ` <p-progressSpinner ariaLabel="loading" /> `,
})
export class LoadingComponent {}
