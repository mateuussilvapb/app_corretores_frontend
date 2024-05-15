import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: false,
  template: `
    <p-toast
      position="top-right"
      [showTransformOptions]="'translateX(100%)'"
      [breakpoints]="{
        '920px': { width: '100%', right: '0', left: '0' }
      }"
    ></p-toast>
  `,
})
export class ToastComponent {}
