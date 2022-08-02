import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TodoComponent} from './todo/feature/todo/todo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import { TodoItemComponent } from './todo/ui/todo-item/todo-item.component';
import {MatIconModule} from "@angular/material/icon";
import { IsDonePipe } from './todo/utils/is-done.pipe';
import { TooltipDirective } from './todo/utils/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoItemComponent,
    IsDonePipe,
    TooltipDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
