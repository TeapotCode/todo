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
  date: number | undefined;

  @Input('todoItem')
  set _item(item: TodoItem) {
    this.item = item;
    if (item.doneCreated) {
      this.description = `Zrobione dnia ${this.datePipe.transform(item.doneCreated, 'mediumDate')}`
    }
    if(item.dateDeadline) {
      this.date = item.dateDeadline
    }
  }

  @Output('remove') remove = new EventEmitter<void>();
  @Output('checked') check = new EventEmitter<boolean>();

  constructor(private datePipe: DatePipe, private el: ElementRef, private overlay: Overlay, @Inject(DOCUMENT) private document: Document) {
  }

  onCheck() {
    this.item.done = !this.item.done
    this.check.emit(this.item.done)
  }

  @ViewChild('buttonref', {read: ElementRef}) buttonRemoveRef!: ElementRef<HTMLButtonElement>;

  get overlayConfig(): OverlayConfig {
    return {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position().flexibleConnectedTo(this.el).withPositions([
        new ConnectionPositionPair(
          {originX: 'end', originY: "top"},
          {overlayX: 'start', overlayY: 'top'},
          10
        )
      ])
    }
  }

  isModalOpen: boolean = false;

  onRemove() {
    if (!this.isModalOpen) {
      let overlayRef = this.overlay.create(this.overlayConfig)
      let component = overlayRef.attach(new ComponentPortal(TodoItemPopupComponent));

      let onOutSideClick = fromEvent<MouseEvent>(this.document, "mousedown")
        .pipe(
          filter(({target}) =>
            target instanceof Element && !component.location.nativeElement.contains(target) && !this.buttonRemoveRef.nativeElement.contains(target)),
          map(() => false));

      let onDenyClick = component.instance.onClose.asObservable();

      merge(onOutSideClick, onDenyClick).pipe(take(1)).subscribe(value => {
        if (value) this.remove.emit()
        component.destroy()
        this.isModalOpen = false
      })
    }
  }
}
