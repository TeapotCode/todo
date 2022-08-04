import {Component, HostBinding, Input} from '@angular/core';

export type NotificationType = 'success' | 'error';

@Component({
  selector: 'app-ui',
  template: '{{message}}',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  _type: NotificationType = 'success';

  @Input()
  set type(type: NotificationType) {
    this._type = type
    this.class = type
  }

  @Input() message: string = "";

  @HostBinding('class') class = this._type

  constructor() {}

}

