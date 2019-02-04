import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatDividerModule, MatMenuModule, MatIconModule, MatTableModule, MatProgressSpinnerModule, MatDialogModule, MatAutocompleteModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
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
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSnackBarModule,
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
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class MaterialModule { }
