import {Component, ElementRef, ViewChild} from '@angular/core';
import {TodoListService} from "../../data-access/todo-list.service";
import {TodoItem} from "../../utils/todoitem";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor(public todoService: TodoListService) { }

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  addTodo() {
    this.todoService.addTodo(this.inputRef.nativeElement.value)
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()
  }

  onRemove(item: TodoItem) {
    this.todoService.removeItem(item);
  }

  onCheck(item: TodoItem) {
    this.todoService.check(item);
  }
}
