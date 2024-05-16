import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInboundComponent } from './add-inbound.component';

describe('AddInboundComponent', () => {
  let component: AddInboundComponent;
  let fixture: ComponentFixture<AddInboundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInboundComponent]
    });
    fixture = TestBed.createComponent(AddInboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
