import {Injectable} from '@angular/core';
import {TodoItem} from "../utils/todoitem";


@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todoList: TodoItem[] = [
    {id: Symbol(), name: 'asdasd', done: true, doneCreated: new Date().getTime()},
    {id: Symbol(), name: 'asdasdasdasdasksdgksdkjfsdasdasdf', done: false, doneCreated: null},
    {
      id: Symbol(),
      name: 'asdasdasdasdasksdgksdkjfsdasdasdfasdasdasdasdasksdgksdkjfsdasdasdfasdasdasdasdasksdgksdkjfsdasdasdfasdasdasdasdasksdgksdkjfsdasdasdf',
      done: false,
      doneCreated: null
    },
  ]

  addTodo(name: string): void {
    this.todoList.push({
      id: Symbol(name),
      name,
      done: false,
      doneCreated: new Date().getTime()
    })
  }

  getTodos(): TodoItem[] {
    return [...this.todoList].reverse()
  }

  removeItem(item: TodoItem) {
    this.todoList = this.todoList.filter(x => x.id !== item.id);
  }

  check(item: TodoItem) {
    this.todoList = this.todoList.map(value => {
      if (value.id === item.id)
        return {
          ...item,
          done: item.done,
          doneCreated: item.done ? new Date().getTime() : null
        }
      return value
    })
  }
}
