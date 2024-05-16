import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarlinkLayoutComponent } from './sidebarlink-layout.component';

describe('SidebarlinkLayoutComponent', () => {
  let component: SidebarlinkLayoutComponent;
  let fixture: ComponentFixture<SidebarlinkLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarlinkLayoutComponent]
    });
    fixture = TestBed.createComponent(SidebarlinkLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
