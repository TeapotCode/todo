import {Component} from '@angular/core';

@Component({
  selector: 'app-notify-wrapper',
  template: ``,
  styles: [`
    :host {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    pointer-events: none;
    align-items: flex-end;
  }
  `]
})
export class NotifyWrapperComponent {
  constructor() {
  }
}
