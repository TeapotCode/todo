import {Component} from '@angular/core';

@Component({
  selector: 'app-notify',
  template: `
    <ng-container #ref></ng-container>
  `,
  styles: [`
    :host {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    pointer-events: none;
    align-items: flex-end;
  }
  `]
})
export class NotifyComponent {
  constructor() {
  }
}
