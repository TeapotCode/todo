import {Component, HostBinding, Input} from '@angular/core';

export type NotificationType = 'success' | 'error';

@Component({
  selector: 'app-notification',
  template: '{{message}}',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @Input() type: NotificationType = "success";
  @Input() message: string = "";

  @HostBinding('class') class = this.type

  constructor() { }

}
