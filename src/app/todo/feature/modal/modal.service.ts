import {ComponentRef, ElementRef, Inject, Injectable} from '@angular/core';
import {ConnectionPositionPair, Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {TodoItemPopupComponent} from "./todo-item-popup.component";
import {ComponentPortal} from "@angular/cdk/portal";
import {EMPTY, filter, fromEvent, take, tap} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpen: boolean = false
  private componentRef: ComponentRef<TodoItemPopupComponent> | undefined;

  constructor(@Inject(DOCUMENT) private document: Document, private overlay: Overlay) {
  }

  private overlayConfig(elementRef: ElementRef): OverlayConfig {
    return {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position().flexibleConnectedTo(elementRef).withPositions([
        new ConnectionPositionPair(
          {originX: 'end', originY: "top"},
          {overlayX: 'start', overlayY: 'top'},
          10
        )
      ])
    }
  }

  open(elementRef: ElementRef, callback: () => void): void {
    if (!this.componentRef) {
      let overlayRef = this.overlay.create(this.overlayConfig(elementRef))
      this.componentRef = overlayRef.attach(new ComponentPortal(TodoItemPopupComponent));

      let clear = () => {
        this.componentRef?.destroy()
        this.componentRef = undefined
      }

      fromEvent<MouseEvent>(this.document, "mousedown")
        .pipe(
          filter(({target}) =>
            target instanceof Element && !this.componentRef?.location.nativeElement.contains(target) && !elementRef.nativeElement.contains(target)),
          tap(clear.bind(this)),
          take(1))
        .subscribe()

      this.componentRef.instance.onClose
        .pipe(tap(value => {
          if(value) callback()
          clear()
        }))
        .subscribe()
    }

  }

}
