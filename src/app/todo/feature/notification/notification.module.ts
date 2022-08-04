import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "./ui/notification.component";
import {PortalModule} from "@angular/cdk/portal";
import {NotifyWrapperComponent} from "./ui/notify-wrapper.component";



@NgModule({
  declarations: [
    NotificationComponent,
    NotifyWrapperComponent
  ],
  imports: [
    CommonModule,
    PortalModule
  ],
  exports: [
    NotificationComponent,
    NotifyWrapperComponent
  ]
})
export class NotificationModule { }
