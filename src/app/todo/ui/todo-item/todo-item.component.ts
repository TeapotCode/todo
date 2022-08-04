import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output, ViewChild
} from '@angular/core';
import {TodoItem} from "../../utils/todoItem";
import {DatePipe} from "@angular/common";
import {ModalService} from "../../feature/modal/modal.service";
import {Element} from "@angular/compiler";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class TodoItemComponent {


  item!: TodoItem;
  description: string = 'Task nie zrobiony';

  @Input('todoItem')
  set _item(item: TodoItem) {
    this.item = item;
    if (item.doneCreated) {
      this.description = `Zrobione dnia ${this.datePipe.transform(item.doneCreated, 'mediumDate')}`
    }
  }

  @Output('remove') remove = new EventEmitter<void>();
  @Output('checked') check = new EventEmitter<boolean>();

  constructor(private datePipe: DatePipe, private el: ElementRef, private modal: ModalService) {
  }

  @ViewChild('buttonref', {read: ElementRef}) buttonRemoveRef!: ElementRef<HTMLButtonElement>;

  onCheck() {
    this.item.done = !this.item.done
    this.check.emit(this.item.done)
  }

  onRemove() {
    this.modal.open(this.buttonRemoveRef, () => {
      this.remove.emit()
    })
  }
}
