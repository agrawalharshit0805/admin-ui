import { TestBed } from '@angular/core/testing';

import { AuthenticationProcessingService } from './authentication-processing.service';

describe('AuthenticationProcessingService', () => {
  let service: AuthenticationProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
