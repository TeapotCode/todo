import {Component} from '@angular/core';
import {TodoListService} from "../../data-access/todo-list.service";
import {TodoItem} from "../../utils/todoItem";
import {NotifyService} from "../../utils/notification/notify.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  constructor(public todoService: TodoListService, private notification: NotifyService) {
  }

  addTodo(name: string, date?: number) {
    if (name.length < 5) {
      this.notification.notify('error', 'Nazwa zadania nie może być krótsza niż 5 znaków')
    } else {
      this.notification.notify('success', 'Dodano zadanie: ' + name)
      this.todoService.addTodo(name, date)
    }
  }

  onRemove(item: TodoItem) {
    this.notification.notify('success', 'Usunięto zadanie: ' + item.name)
    this.todoService.removeItem(item);
  }

  onCheck(item: TodoItem) {
    if (item.done) this.notification.notify('success', 'Wykonano zadanie: ' + item.name)
    this.todoService.check(item);
  }

}
