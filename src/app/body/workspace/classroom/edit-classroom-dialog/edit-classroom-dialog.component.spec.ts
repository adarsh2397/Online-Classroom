import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassroomDialogComponent } from './edit-classroom-dialog.component';

describe('EditClassroomDialogComponent', () => {
  let component: EditClassroomDialogComponent;
  let fixture: ComponentFixture<EditClassroomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClassroomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClassroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
