import { Component, OnInit } from '@angular/core';
import {DialogComponent} from "../../utils/dialog/dialog.service";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements DialogComponent<Date> {
  private _output = new Subject<Date>();

  output: Observable<Date> = this._output.asObservable();

  constructor() { }

  onDateSelect(value: Date) {
    this._output.next(value);
    this._output.complete();
  }
}
