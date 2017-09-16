import { TestBed, inject } from '@angular/core/testing';

import { AcessoItemService } from './acesso-item.service';

describe('AcessoItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcessoItemService]
    });
  });

  it('should be created', inject([AcessoItemService], (service: AcessoItemService) => {
    expect(service).toBeTruthy();
  }));
});
