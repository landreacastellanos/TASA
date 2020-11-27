import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurningForSowingComponent } from './burning-for-sowing.component';

describe('BurningForSowingComponent', () => {
  let component: BurningForSowingComponent;
  let fixture: ComponentFixture<BurningForSowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurningForSowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurningForSowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
