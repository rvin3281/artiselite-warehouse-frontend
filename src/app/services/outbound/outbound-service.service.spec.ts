import { TestBed } from '@angular/core/testing';

import { OutboundServiceService } from './outbound-service.service';

describe('OutboundServiceService', () => {
  let service: OutboundServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutboundServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
