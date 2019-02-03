import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Dragon } from "../Dragon";
import { DragonService } from '../dragon.service';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { DragonTableItem } from './DragonTableItem';
import { RemoveConfirmationDialogComponent } from './remove-confirmation-dialog/remove-confirmation-dialog.component';

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

  constructor(private readonly dragonService: DragonService, public dialog: MatDialog) {
    this.tableCollumns = TABLE_COLLUMNS;
  }

  ngOnInit(): void {
    this.loadDragons();
  }

  refresh(): void {
    this.loadDragons();
  }

  toggleSelectAll(): void {
    this.items.forEach((item) => item.selected = this.selectAll);
  }

  setBusy(state: boolean): void {
    this.$loading = state;
  }

  addItem(): void {
    this.showCreateDragonDialog();
  }

  confirmRemoveItem(item: DragonTableItem): void {
    this.showRemoveConfirmationDialog(item);
  }

  confirmRemoveSelected(item: DragonTableItem): void {
    this.showRemoveConfirmationDialog();
  }

  getSelected(): DragonTableItem[] {
    return this.items.filter((item) => item.selected);
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

  private showCreateDragonDialog(): void {
    const dialogInstance = this.showDialog(CreateDialogComponent);
    dialogInstance.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

  private showRemoveConfirmationDialog(item?: DragonTableItem): void {
    const data = item ? item : undefined;
    const dialogInstance = this.showDialog(RemoveConfirmationDialogComponent, data);

    dialogInstance.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

  private showDialog(dialogComponent: any, settings?: any) {
    const dialogSettings = Object.assign({}, settings || undefined);

    return this.dialog.open(dialogComponent, dialogSettings);;
  }
}
