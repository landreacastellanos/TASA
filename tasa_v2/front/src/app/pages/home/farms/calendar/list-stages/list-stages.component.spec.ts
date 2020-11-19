import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStagesComponent } from './list-stages.component';

describe('ListStagesComponent', () => {
  let component: ListStagesComponent;
  let fixture: ComponentFixture<ListStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
