import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "./notification/notification.component";
import { NotifyComponent } from './notify.component';
import {PortalModule} from "@angular/cdk/portal";
import {OverlayModule} from "@angular/cdk/overlay";



@NgModule({
  declarations: [
    NotificationComponent,
    NotifyComponent
  ],
  exports: [
    NotificationComponent,
    NotifyComponent
  ],
  imports: [
    CommonModule,
    PortalModule
  ]
})
export class NotificationModule { }
