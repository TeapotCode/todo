import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output, ViewChild
} from '@angular/core';
import {TodoItem} from "../../utils/todoItem";
import {DatePipe, DOCUMENT} from "@angular/common";
import {ConnectionPositionPair, Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {TodoItemPopupComponent} from "../todo-item-popup/todo-item-popup.component";
import {filter, fromEvent, map, merge, take} from "rxjs";
import {DialogService} from "../../utils/dialog/dialog.service";
import {DatePickerComponent} from "../date-picker/date-picker.component";

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
  @Output('setDate') setDate = new EventEmitter<Date>();

  constructor(private datePipe: DatePipe, private el: ElementRef, private overlay: Overlay, @Inject(DOCUMENT) private document: Document, private dialog: DialogService) {
  }

  onCheck() {
    this.item.done = !this.item.done
    this.check.emit(this.item.done)
  }

  @ViewChild('buttonRef', {read: ElementRef}) buttonRemoveRef!: ElementRef<HTMLButtonElement>;

  onRemove() {
    this.dialog.open(this.buttonRemoveRef, TodoItemPopupComponent, (value) => {
      if (value) this.remove.emit()
    })
  }

  @ViewChild('dateRef', {static: true}) dateRef!: ElementRef<HTMLParagraphElement>;

  onDateClick() {
    this.dialog.open(this.dateRef, DatePickerComponent, (selected) => {
      this.setDate.emit(selected);
    })
  }
}
