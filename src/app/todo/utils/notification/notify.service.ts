import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
} from '@angular/core';
import {NotificationComponent, NotificationType} from "./notification/notification.component";
import {DOCUMENT} from "@angular/common";
import {ComponentPortal, DomPortalOutlet} from "@angular/cdk/portal";
import {NotifyComponent} from "./notify.component";


@Injectable({
  providedIn: 'root'
})
export class NotifyService implements OnDestroy {

  notifyComp: ComponentRef<NotifyComponent> | undefined;

  constructor(@Inject(DOCUMENT) private document: Document, private factory: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  notify(type: NotificationType, message: string, duration: number = 4000) {
    if (!this.notifyComp) {
      const dom = new DomPortalOutlet(this.document.body, this.factory, this.appRef, this.injector)
      this.notifyComp = dom.attach(new ComponentPortal(NotifyComponent))
    }
    const outlet = new DomPortalOutlet(this.notifyComp.location.nativeElement, this.factory, this.appRef, this.injector)
    const comp = outlet.attach(new ComponentPortal(NotificationComponent))
    comp.setInput('type', type)
    comp.setInput('message', message)

    setTimeout(() => {
      comp.destroy()
    }, duration)
  }

  ngOnDestroy(): void {
    this.notifyComp && this.notifyComp.destroy()
  }
}
