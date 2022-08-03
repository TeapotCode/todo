import { Pipe, PipeTransform } from '@angular/core';
import {TodoItem} from "./todoItem";

@Pipe({
  name: 'isDone'
})
export class IsDonePipe implements PipeTransform {

  transform(value: TodoItem[], isDone: boolean): TodoItem[] {
    return value.filter(x => x.done === isDone);
  }
}
