import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonListComponent } from './list.component';

describe('ListComponent', () => {
  let component: DragonListComponent;
  let fixture: ComponentFixture<DragonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
