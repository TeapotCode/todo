import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "./notification/notification.component";
import { NotifyComponent } from './notify.component';



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
    CommonModule
  ]
})
export class NotificationModule { }
