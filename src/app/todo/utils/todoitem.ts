export interface TodoItem {
  id: Symbol;
  name: string;
  done: boolean;
  doneCreated: number | null;
}
