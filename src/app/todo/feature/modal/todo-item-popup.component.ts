import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConnectionPositionPair, Overlay, OverlayConfig} from "@angular/cdk/overlay";

@Component({
  selector: 'app-todo-item-popup',
  templateUrl: './todo-item-popup.component.html',
  styleUrls: ['./todo-item-popup.component.scss']
})
export class TodoItemPopupComponent {

  @Input() message: string = "Usunąć?";
  @Input() element!: ElementRef;
  @Output() onClose = new EventEmitter<boolean>();

  constructor() { }

  onConfirm() {
    this.onClose.emit(true)
    this.onClose.complete()
  }

  onDeny() {
    this.onClose.emit(false)
    this.onClose.complete()
  }
}
