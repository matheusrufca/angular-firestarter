import { Component, OnInit } from '@angular/core';
import { Dragon } from "../Dragon";
import { DragonService } from '../dragon.service';
import { DragonTableItem } from './DragonTableItem';

const TABLE_COLLUMNS = [
  'selection',
  'name',
  'type',
  'actions',
];

@Component({
  selector: 'dragon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class DragonListComponent implements OnInit {
  public readonly tableCollumns: string[];
  public items: DragonTableItem[] = [];
  public selectAll: boolean = false;
  public $loading: boolean = false;

  constructor(private readonly dragonService: DragonService) {
    this.tableCollumns = TABLE_COLLUMNS;
  }

  ngOnInit() {
    this.loadDragons();
  }

  private async loadDragons(): Promise<void> {
    this.setBusy(true);
    try {
      const items = await this.dragonService.get();
      this.items = items.map((item: Dragon) => {
        return {
          selected: false,
          data: item,
        }
      });
    } catch (error) {
      // TODO: handle error
    } finally {
      this.setBusy(false);
    }
  }

  refresh() {
    this.loadDragons();
  }

  toggleSelectAll() {
    this.items.forEach((item) => item.selected = this.selectAll);
  }

  setBusy(state: boolean) {
    this.$loading = state;
  }

  getSelected() {
    return this.items.filter((item) => item.selected);
  }
}
