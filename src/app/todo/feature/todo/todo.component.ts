import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {TodoListService} from "../../data-access/todo-list.service";
import {TodoItem} from "../../utils/todoItem";
import {NotificationRefDirective} from "../../utils/notification-ref.directive";
import {NotificationComponent, NotificationType} from "../../ui/notification/notification.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnDestroy {
  constructor(public todoService: TodoListService) {
  }

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  addTodo() {
    if (this.inputRef.nativeElement.value.length < 5) {
      this.notify('error', 'Nazwa taska nie może być krótsza niż 5 znaków')
      return
    }
    this.notify('success', 'Dodano taska: ' + this.inputRef.nativeElement.value)

    this.todoService.addTodo(this.inputRef.nativeElement.value)
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()
  }

  onRemove(item: TodoItem) {
    this.notify('success', 'Usunięto taska: ' + item.name)

    this.todoService.removeItem(item);
  }

  onCheck(item: TodoItem) {
    if (item.done) this.notify('success', 'Wykonano taska: ' + item.name)
    this.todoService.check(item);
  }

  @ViewChild(NotificationRefDirective, {static: true}) notificationRef!: NotificationRefDirective;
  timeoutRef: ReturnType<typeof setTimeout> | undefined;

  notify(type: NotificationType, message: string, duration: number = 5000) {
    const componentRef = this.notificationRef.viewContainerRef.createComponent(NotificationComponent)
    componentRef.setInput('type', type)
    componentRef.setInput('message', message)

    this.timeoutRef = setTimeout(() => {
      componentRef.destroy()
    }, duration)
  }

  ngOnDestroy(): void {
    this.notificationRef.viewContainerRef.clear()
    this.timeoutRef && clearTimeout(this.timeoutRef);
  }
}
