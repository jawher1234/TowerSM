import { TestBed } from '@angular/core/testing';

import { AerportService } from './aerport.service';

describe('AerportService', () => {
  let service: AerportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AerportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
