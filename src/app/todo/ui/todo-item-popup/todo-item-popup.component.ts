import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-todo-item-popup',
  templateUrl: './todo-item-popup.component.html',
  styleUrls: ['./todo-item-popup.component.scss']
})
export class TodoItemPopupComponent {

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
