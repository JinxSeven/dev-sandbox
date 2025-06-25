import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewClientComponent } from './create-new-client.component';

describe('CreateNewClientComponent', () => {
  let component: CreateNewClientComponent;
  let fixture: ComponentFixture<CreateNewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
