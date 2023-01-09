import { TestBed } from '@angular/core/testing';

import { LikepostserviceService } from './likepostservice.service';

describe('LikepostserviceService', () => {
  let service: LikepostserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikepostserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
