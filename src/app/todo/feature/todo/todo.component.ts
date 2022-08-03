import {Component, ElementRef, ViewChild} from '@angular/core';
import {TodoListService} from "../../data-access/todo-list.service";
import {TodoItem} from "../../utils/todoItem";
import {NotificationRefDirective} from "../../utils/notification-ref.directive";
import {NotificationComponent, NotificationType} from "../../ui/notification/notification.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor(public todoService: TodoListService) {
  }

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  addTodo() {
    if (this.inputRef.nativeElement.value.length < 6) {
      this.loadComponent('error', 'Nazwa taska nie może być krótsza niż 5 znaków')
      return
    }
    this.loadComponent('success', 'Dodano taska: ' + this.inputRef.nativeElement.value)

    this.todoService.addTodo(this.inputRef.nativeElement.value)
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()
  }

  onRemove(item: TodoItem) {
    this.loadComponent('success', 'Usunięto taska')

    this.todoService.removeItem(item);
  }

  onCheck(item: TodoItem) {
    if (item.done) this.loadComponent('success', 'Zaznaczono taska')
    this.todoService.check(item);
  }

  @ViewChild(NotificationRefDirective, {static: true}) notificationRef!: NotificationRefDirective;
  timeoutRef: ReturnType<typeof setTimeout> | undefined;

  loadComponent(type: NotificationType, message: string, time: number = 5000) {
    const viewContainerRef = this.notificationRef.viewContainerRef
    viewContainerRef.clear()

    if (this.timeoutRef) clearTimeout(this.timeoutRef);

    const componentRef = viewContainerRef.createComponent(NotificationComponent)
    componentRef.instance.type = type
    componentRef.instance.message = message

    this.timeoutRef = setTimeout(() => {
      viewContainerRef.clear()
    }, time)
  }
}
