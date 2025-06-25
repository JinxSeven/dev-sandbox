import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFieldsComponent } from './task-fields.component';

describe('TaskFieldsComponent', () => {
  let component: TaskFieldsComponent;
  let fixture: ComponentFixture<TaskFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
