import { Item } from "./item.model";

export class List {
  id: number;
  title: string;
  creationDate: Date;
  completionDate: Date;
  completed: boolean;
  items: Item[];

  constructor(title: string) {
    this.title = title;
    this.creationDate = new Date();
    this.completed = false;
    this.items = [];
    this.id = new Date().getTime();
  }
}
