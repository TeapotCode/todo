import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TodoComponent} from './todo/feature/todo/todo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {TodoItemComponent} from './todo/ui/todo-item/todo-item.component';
import {MatIconModule} from "@angular/material/icon";
import {IsDonePipe} from './todo/utils/is-done.pipe';
import {TooltipDirective} from './todo/utils/tooltip.directive';
import {NotificationModule} from "./todo/utils/notification/notification.module";
import {TodoItemPopupComponent} from './todo/ui/todo-item-popup/todo-item-popup.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import {TodoListComponent} from './todo/ui/todo-list/todo-list.component';
import {AddTaskInputComponent} from './todo/ui/add-task-input/add-task-input.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePickerComponent} from './todo/ui/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoItemComponent,
    IsDonePipe,
    TooltipDirective,
    TodoItemPopupComponent,
    TodoListComponent,
    AddTaskInputComponent,
    DatePickerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NotificationModule,
    OverlayModule,
    PortalModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
