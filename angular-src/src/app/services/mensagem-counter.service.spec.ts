import { TestBed, inject } from '@angular/core/testing';

import { MensagemCounterService } from './mensagem-counter.service';

describe('MensagemCounterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MensagemCounterService]
    });
  });

  it('should be created', inject([MensagemCounterService], (service: MensagemCounterService) => {
    expect(service).toBeTruthy();
  }));
});
