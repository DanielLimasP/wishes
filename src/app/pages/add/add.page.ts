import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WishesService } from "../../services/wishes.service";
import { List } from "../../models/list.model";
import { Item } from "../../models/item.model";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage implements OnInit {
  list: List;
  itemName = "";
  constructor(
    private wishesService: WishesService,
    private route: ActivatedRoute
  ) {
    const listId = this.route.snapshot.paramMap.get("listId");
    this.list = this.wishesService.getList(listId);
  }

  ngOnInit() {}

  addItem() {
    if (this.itemName.length === 0) {
      return;
    }

    const newItem = new Item(this.itemName);
    this.list.items.push(newItem);

    this.itemName = "";
    this.wishesService.store();
  }

  check(item: Item) {
    const pending = this.list.items.filter(
      (itemData) => itemData.completed === false
    ).length;

    if (pending === 0) {
      this.list.completionDate = new Date();
      this.list.completed = true;
    } else {
      this.list.completionDate = null;
      this.list.completed = false;
    }

    this.wishesService.store();

    console.log(this.wishesService.lists);
  }

  delete(i: number) {
    this.list.items.splice(i, 1);
    this.wishesService.store();
  }
}
