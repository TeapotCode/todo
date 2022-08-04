import {Component} from '@angular/core';

@Component({
  selector: 'app-notify',
  template: `
    <ng-container #ref></ng-container>
  `,
  styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent {
  constructor() {
  }
}
