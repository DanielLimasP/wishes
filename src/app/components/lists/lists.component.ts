import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { WishesService } from "../../services/wishes.service";
import { List } from "../../models/list.model";
import { Router } from "@angular/router";
import { AlertController, IonList } from "@ionic/angular";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"],
})
export class ListsComponent implements OnInit {
  @ViewChild(IonList) list: IonList;
  @Input()
  completed = true;

  constructor(
    private alertController: AlertController,
    public wishesService: WishesService,
    private router: Router
  ) {}

  ngOnInit() {}

  selectedList(list: List) {
    if (this.completed) {
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }

  deleteList(list: List) {
    this.wishesService.deleteList(list);
    console.log("list deleted");
  }

  async editTitle(list: List) {
    const alert = await this.alertController.create({
      header: "Edit list title",
      inputs: [
        {
          name: "newTitle",
          type: "text",
          placeholder: "New title",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel");
            this.list.closeSlidingItems();
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            console.log(data);
            if (data.newTitle.length === 0) {
              return;
            }
            // TODO: Create list
            this.wishesService.editTitle(list, data.newTitle);
            this.list.closeSlidingItems();
          },
        },
      ],
    });

    alert.present();
  }
}
