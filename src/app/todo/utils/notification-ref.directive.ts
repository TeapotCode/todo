import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appNotificationRef]'
})
export class NotificationRefDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
