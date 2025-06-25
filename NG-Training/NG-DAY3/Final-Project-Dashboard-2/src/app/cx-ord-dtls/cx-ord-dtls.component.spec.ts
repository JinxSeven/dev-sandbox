import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxOrdDtlsComponent } from './cx-ord-dtls.component';

describe('CxOrdDtlsComponent', () => {
  let component: CxOrdDtlsComponent;
  let fixture: ComponentFixture<CxOrdDtlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CxOrdDtlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CxOrdDtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
