import { TestBed } from '@angular/core/testing';

import { TypesproblemeService } from './typesprobleme.service';

describe('TypesproblemeService', () => {
  let service: TypesproblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesproblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
