import {
  Component, ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ConnectionPositionPair, Overlay, OverlayRef} from "@angular/cdk/overlay";
import {CdkPortal, TemplatePortal} from "@angular/cdk/portal";

@Component({
  selector: 'app-add-task-input',
  templateUrl: './add-task-input.component.html',
  styleUrls: ['./add-task-input.component.scss']
})
export class AddTaskInputComponent {
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;
  @Output() add = new EventEmitter<{ name: string, date?: number }>()

  selectedDate: number | undefined;

  constructor(private overlay: Overlay) {
  }

  onAddClick() {
    this.renderDate()
  }

  @ViewChild(CdkPortal) dateTemplateRef!: CdkPortal;
  overlayRef: OverlayRef | undefined;

  renderDate() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        positionStrategy: this.overlay.position().flexibleConnectedTo(this.inputRef).withPositions([
          new ConnectionPositionPair(
            {originX: 'start', originY: "bottom"},
            {overlayX: 'start', overlayY: "top"},
            0,20
          )])
      })
      this.overlayRef.attach(this.dateTemplateRef);

      this.overlayRef.backdropClick().subscribe(value => {
        this.overlayRef?.dispose()
        this.overlayRef = undefined;
        this.inputRef.nativeElement.focus()
      })
    }
  }

  onDateSelect(selected: Date) {
    this.selectedDate = selected.getTime();

    this.add.emit({name: this.inputRef.nativeElement.value, date: this.selectedDate})
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()

    this.overlayRef?.dispose()
    this.overlayRef = undefined;
  }

}
