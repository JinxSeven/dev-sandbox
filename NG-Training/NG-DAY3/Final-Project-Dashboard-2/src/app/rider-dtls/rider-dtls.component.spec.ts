import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderDtlsComponent } from './rider-dtls.component';

describe('RiderDtlsComponent', () => {
  let component: RiderDtlsComponent;
  let fixture: ComponentFixture<RiderDtlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderDtlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiderDtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
