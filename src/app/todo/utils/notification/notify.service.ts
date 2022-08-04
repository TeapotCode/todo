import {Injectable, OnDestroy, ViewContainerRef} from '@angular/core';
import {NotificationComponent, NotificationType} from "./notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotifyService implements OnDestroy {

  viewContainerRef!: ViewContainerRef

  constructor() { }

  setUpView(ref: ViewContainerRef) {
    this.viewContainerRef = ref;
  }

  notify(type: NotificationType, message: string, duration: number = 4000) {
    if(!this.viewContainerRef) throw new Error('Notify is not in template!')


    const componentRef = this.viewContainerRef.createComponent(NotificationComponent)
    componentRef.setInput('type', type)
    componentRef.setInput('message', message)

    setTimeout(() => {
      componentRef && componentRef.destroy()
    }, duration)
  }

  ngOnDestroy(): void {
    this.viewContainerRef && this.viewContainerRef.clear()
  }
}
