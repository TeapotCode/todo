import {AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {NotifyService} from "./notify.service";

@Component({
  selector: 'app-notify',
  template: `
      <ng-container #ref></ng-container>
  `,
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements AfterViewInit {

  constructor(private notify: NotifyService) { }

  @ViewChild('ref', {read: ViewContainerRef, static: true}) notificationRef!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.notify.setUpView(this.notificationRef)
  }
}
