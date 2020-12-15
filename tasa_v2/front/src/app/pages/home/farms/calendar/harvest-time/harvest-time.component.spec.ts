import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestTimeComponent } from './harvest-time.component';

describe('HarvestTimeComponent', () => {
  let component: HarvestTimeComponent;
  let fixture: ComponentFixture<HarvestTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarvestTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarvestTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
