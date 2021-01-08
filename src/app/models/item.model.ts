export class Item {
  desc: string;
  completed: boolean;

  constructor(desc: string) {
    this.desc = desc;
    this.completed = false;
  }
}
