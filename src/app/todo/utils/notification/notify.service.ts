import {Injectable, OnDestroy, ViewContainerRef} from '@angular/core';
import {NotificationComponent, NotificationType} from "./notification/notification.component";
import {NotificationModule} from "./notification.module";

@Injectable({
  providedIn: NotificationModule
})
export class NotifyService implements OnDestroy {

  viewContainerRef!: ViewContainerRef
  timeoutRef: ReturnType<typeof setTimeout> | undefined

  constructor() { }

  setUpView(ref: ViewContainerRef) {
    this.viewContainerRef = ref;
  }

  notify(type: NotificationType, message: string, duration: number = 5000) {
    if(!this.viewContainerRef) throw new Error('Notify is not in template!')

    const componentRef = this.viewContainerRef.createComponent(NotificationComponent)
    componentRef.setInput('type', type)
    componentRef.setInput('message', message)

    this.timeoutRef = setTimeout(() => {
      componentRef.destroy()
    }, duration)
  }

  ngOnDestroy(): void {
    this.viewContainerRef.clear()
    this.timeoutRef && clearTimeout(this.timeoutRef)
  }
}
