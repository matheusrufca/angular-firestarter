import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmationDialogComponent } from './edit-confirmation-dialog.component';

describe('EditConfirmationDialogComponent', () => {
  let component: EditConfirmationDialogComponent;
  let fixture: ComponentFixture<EditConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
