import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-todo></app-todo>
    <app-notify></app-notify>`,
  styleUrls: ['app.component.css']
})
export class AppComponent {
}
