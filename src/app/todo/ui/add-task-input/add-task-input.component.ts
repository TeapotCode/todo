import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-task-input',
  templateUrl: './add-task-input.component.html',
  styleUrls: ['./add-task-input.component.scss']
})
export class AddTaskInputComponent {
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;
  @Output() add = new EventEmitter<{ name: string, date?: number }>()

  onAdd() {
    this.add.emit({name: this.inputRef.nativeElement.value})
    this.inputRef.nativeElement.value = ''
    this.inputRef.nativeElement.focus()
  }
}
