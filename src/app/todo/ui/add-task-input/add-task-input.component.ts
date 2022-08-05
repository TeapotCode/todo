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
import {DialogService} from "../../utils/date-dialog/dialog.service";
import {DatePickerComponent} from "../date-picker/date-picker.component";

@Component({
  selector: 'app-add-task-input',
  templateUrl: './add-task-input.component.html',
  styleUrls: ['./add-task-input.component.scss']
})
export class AddTaskInputComponent {
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;
  @Output() add = new EventEmitter<{ name: string, date?: number }>()

  selectedDate: number | undefined;

  constructor(private dialog: DialogService) {
  }

  @ViewChild('buttonRef', {read: ElementRef}) buttonRef!: ElementRef<HTMLButtonElement>;

  onAddClick() {
    this.dialog.open(this.buttonRef, DatePickerComponent, (selected: Date) => {
      this.onDateSelect(selected)
    })
  }

  onDateSelect(selected: Date) {
    this.selectedDate = selected.getTime();
    this.add.emit({name: this.inputRef.nativeElement.value, date: this.selectedDate})
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()
  }

}
