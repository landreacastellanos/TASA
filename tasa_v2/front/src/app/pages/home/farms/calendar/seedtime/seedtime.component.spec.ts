import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedtimeComponent } from './seedtime.component';

describe('SeedtimeComponent', () => {
  let component: SeedtimeComponent;
  let fixture: ComponentFixture<SeedtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedtimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
