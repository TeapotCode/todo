import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItem} from "../../utils/todoItem";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() list: TodoItem[] = [];
  @Output() remove = new EventEmitter<TodoItem>();
  @Output() mark = new EventEmitter<TodoItem>();
  @Output('setDate') setDate = new EventEmitter<TodoItem>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRemove(item: TodoItem) {
    this.remove.emit(item)
  }

  onCheck(item: TodoItem) {
    this.mark.emit(item)
  }

  onSetDate(item: TodoItem, selected: Date) {
    item.dateDeadline = selected.getTime()
    this.setDate.emit(item)
  }
}
