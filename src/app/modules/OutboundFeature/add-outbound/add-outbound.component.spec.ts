import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutboundComponent } from './add-outbound.component';

describe('AddOutboundComponent', () => {
  let component: AddOutboundComponent;
  let fixture: ComponentFixture<AddOutboundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOutboundComponent]
    });
    fixture = TestBed.createComponent(AddOutboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
