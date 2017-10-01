import { TestBed, inject } from '@angular/core/testing';

import { EventoService } from './evento.service';

describe('EventoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventoService]
    });
  });

  it('should be created', inject([EventoService], (service: EventoService) => {
    expect(service).toBeTruthy();
  }));
});
