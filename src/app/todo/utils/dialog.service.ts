import {ElementRef, Inject, Injectable} from '@angular/core';
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";
import {Observable, Subject, takeUntil} from "rxjs";
import {ConnectionPositionPair, Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {DOCUMENT} from "@angular/common";

export interface DialogComponent<T> {
  output: Observable<T>
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private overlay: Overlay, @Inject(DOCUMENT) private document: Document) {
  }

  private overlayConfig(element: ElementRef): OverlayConfig {
    return {
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position().flexibleConnectedTo(element).withPositions([
        new ConnectionPositionPair(
          {originX: 'end', originY: "top"},
          {overlayX: 'start', overlayY: 'top'},
          10
        ),
        new ConnectionPositionPair(
          {originX: 'start', originY: "bottom"},
          {overlayX: 'start', overlayY: 'top'},
          0, 20
        )
      ])
    }
  }

  open<T>(element: ElementRef, component: ComponentType<DialogComponent<T>>, callback: (value: T) => void) {
    let overlayRef = this.overlay.create(this.overlayConfig(element))
    let componentRef = overlayRef.attach(new ComponentPortal(component));

    let unsubscribe = new Subject();

    overlayRef.backdropClick().pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        componentRef.destroy()
        unsubscribe.next("")
      })

    componentRef.instance.output.pipe(takeUntil(unsubscribe))
      .subscribe((value) => {
        callback(value)
        componentRef.destroy()
        unsubscribe.next("")
      });


  }
}
