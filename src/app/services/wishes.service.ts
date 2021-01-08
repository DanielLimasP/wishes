import { Injectable } from "@angular/core";
import { List } from "../models/list.model";

@Injectable({
  providedIn: "root",
})
export class WishesService {
  lists: List[] = [];
  constructor() {
    console.log("Service init");
    console.log("Loading lists");
    this.load();
  }

  createList(title: string) {
    const newList = new List(title);
    this.lists.push(newList);
    this.store();
    return newList.id;
  }

  getList(id: string | number) {
    id = Number(id);
    return this.lists.find((listData) => listData.id === id);
  }

  store() {
    localStorage.setItem("data", JSON.stringify(this.lists));
  }

  load() {
    if (localStorage.getItem("data")) {
      this.lists = JSON.parse(localStorage.getItem("data"));
    } else {
      this.lists = [];
    }
  }

  deleteList(list: List) {
    console.log(list);
    this.lists = this.lists.filter((listData) => listData.id !== list.id);
    this.store();
  }

  editTitle(list: List, newTitle: string) {
    const auxList = this.lists.filter((listData) => listData.id === list.id);
    auxList[0].title = newTitle;
    this.store();
  }
}
