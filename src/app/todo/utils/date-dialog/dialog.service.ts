import {Component, ElementRef, EventEmitter, Inject, Injectable} from '@angular/core';
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";
import {EMPTY, Observable, take} from "rxjs";
import {ConnectionPositionPair, Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {DOCUMENT} from "@angular/common";

export interface DialogComponent<T> {
  output: Observable<T>
}

type GetInsideObservable<X> = X extends Observable<infer I> ? I : undefined;

@Injectable({
  providedIn: 'root'
})
export class DialogService {


  constructor(private overlay: Overlay, @Inject(DOCUMENT) private document: Document) { }

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
          0,20
        )
      ])
    }
  }

  open<T extends DialogComponent<GetInsideObservable<T["output"]>>>(element: ElementRef, component: ComponentType<T>, callback: (value: GetInsideObservable<T["output"]>) => void) {
      let overlayRef = this.overlay.create(this.overlayConfig(element))
      let componentRef = overlayRef.attach(new ComponentPortal(component));

      overlayRef.backdropClick().pipe(take(1))
        .subscribe(() => {
        componentRef.destroy()
      })

      componentRef.instance.output.pipe(take(1))
        .subscribe((value) => {
        callback(value)
        componentRef.destroy()
      });
  }
}
