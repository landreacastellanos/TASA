import { TestBed } from '@angular/core/testing';

import { RoleByIdGuard } from './role-by-id.guard';

describe('RoleByIdGuard', () => {
  let guard: RoleByIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleByIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
