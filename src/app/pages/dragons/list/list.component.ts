import { Component, OnInit } from '@angular/core';
import { DragonService } from '../dragon.service';
import { Dragon } from "../Dragon";

@Component({
  selector: 'dragon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class DragonListComponent implements OnInit {
  public list: Dragon[] = [];
  constructor(private readonly dragonService: DragonService) { }

  ngOnInit() {
    this.loadDragons();
  }

  private async loadDragons(): Promise<void> {
    this.list = await this.dragonService.get();
    console.debug("dragonList", this.list)
  }
}
