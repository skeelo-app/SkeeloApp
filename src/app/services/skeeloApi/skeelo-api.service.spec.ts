import { TestBed } from '@angular/core/testing';

import { SkeeloApiService } from './skeelo-api.service';

describe('SkeeloApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkeeloApiService = TestBed.get(SkeeloApiService);
    expect(service).toBeTruthy();
  });
});
