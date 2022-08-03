import {Component, ElementRef, ViewChild} from '@angular/core';
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

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  addTodo() {
    if (this.inputRef.nativeElement.value.length < 5) {
      this.notification.notify('error', 'Nazwa taska nie może być krótsza niż 5 znaków')
      return
    }
    this.notification.notify('success', 'Dodano taska: ' + this.inputRef.nativeElement.value)


    this.todoService.addTodo(this.inputRef.nativeElement.value)
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()
  }

  onRemove(item: TodoItem) {
    this.notification.notify('success', 'Usunięto taska: ' + item.name)

    this.todoService.removeItem(item);
  }

  onCheck(item: TodoItem) {
    if (item.done) this.notification.notify('success', 'Wykonano taska: ' + item.name)
    this.todoService.check(item);
  }

}
