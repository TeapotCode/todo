import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {TodoItem} from "../../utils/todoItem";
import {DatePipe} from "@angular/common";

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

  @Output('checked') check = new EventEmitter<boolean>();
  @Output('remove') remove = new EventEmitter<void>();

  constructor(private datePipe: DatePipe) {
  }

  @HostListener('click')
  onCheck() {
    this.item.done = !this.item.done
    this.check.emit(this.item.done)
  }
}
