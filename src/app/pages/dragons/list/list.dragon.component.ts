import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Dragon } from "../Dragon";
import { DragonService } from '../dragon.service';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { DragonTableItem } from './DragonTableItem';
import { RemoveConfirmationDialogComponent } from './remove-confirmation-dialog/remove-confirmation-dialog.component';

const TABLE_COLLUMNS = [
  'selection',
  'name',
  'type',
  'createdAt',
  'actions',
];

@Component({
  selector: 'dragon-list',
  templateUrl: './list.dragon.component.html',
  styleUrls: ['./list.dragon.component.scss']
})

export class ListDragonComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public readonly tableColumns: string[];
  public items: MatTableDataSource<DragonTableItem> = new MatTableDataSource<DragonTableItem>([]);
  public selectAll: boolean = false;
  public $loading: boolean = false;

  constructor(private readonly dragonService: DragonService, public dialog: MatDialog) {
    this.tableColumns = TABLE_COLLUMNS;
  }

  ngOnInit(): void {
    this.items.paginator = this.paginator;
    this.loadDragons();
  }

  async refresh(): Promise<void> {
    await this.loadDragons();
  }

  toggleSelectAll(): void {
    this.items.data.forEach((item) => item.selected = this.selectAll);
  }

  setBusy(state: boolean): void {
    this.$loading = state;
  }

  addItem(): void {
    this.showCreateDragonDialog();
  }

  async removeItem(item: DragonTableItem) {
    try {
      const result = await this.dragonService.delete(item.data.id);
      console.debug(result);
    } catch (error) {
      throw error;
    }
  }

  confirmRemoveItem(item: DragonTableItem): void {
    this.showRemoveConfirmationDialog(item);
  }

  confirmRemoveSelected(item: DragonTableItem): void {
    this.showRemoveConfirmationDialog();
  }

  getSelected(): DragonTableItem[] {
    return this.items.data.filter((item) => item.selected);
  }

  private async loadDragons(): Promise<void> {
    this.setBusy(true);
    try {
      const dragons = await this.dragonService.get();
      this.items.data = dragons
        .sort((a: Dragon, b: Dragon) => a.name.localeCompare(b.name))
        .map((item: Dragon) => ({ selected: false, data: item }));
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

      }
    });
  }

  private showRemoveConfirmationDialog(item?: DragonTableItem): void {
    const data = item ? item : undefined;
    const dialogInstance = this.showDialog(RemoveConfirmationDialogComponent, data);

    dialogInstance.afterClosed().subscribe(async (result) => await this.onCloseRemoveConfirmation(result, item));
  }

  private async onCloseRemoveConfirmation(result: any, item?: DragonTableItem): Promise<void> {
    if (result) {
      this.setBusy(true);
      try {
        if (item) {
          await this.removeItem(item);
        } else {
          await this.removeSelectedItems();
        }
        await this.refresh();
      } catch (error) { }
      finally {
        this.setBusy(false);
      }
    }
  }

  private async removeSelectedItems(): Promise<any[]> {
    const items = this.getSelected();
    const removePromises = items.map((item) => this.removeItem(item));
    return await Promise.all(removePromises);
  }

  private showDialog(dialogComponent: any, settings?: any) {
    const dialogSettings = Object.assign({}, settings || undefined);

    return this.dialog.open(dialogComponent, dialogSettings);;
  }
}
