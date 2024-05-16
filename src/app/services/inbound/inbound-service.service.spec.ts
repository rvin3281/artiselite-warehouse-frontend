import { TestBed } from '@angular/core/testing';

import { InboundServiceService } from './inbound-service.service';

describe('InboundServiceService', () => {
  let service: InboundServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InboundServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
