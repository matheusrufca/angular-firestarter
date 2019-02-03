import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatDividerModule, MatMenuModule, MatIconModule, MatTableModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    LayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
  ],
  exports: [
    LayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
  ],
})
export class MaterialModule { }
