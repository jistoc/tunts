/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutenticacaoService } from './autenticacao.service';

describe('AutenticacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticacaoService]
    });
  });

  it('should ...', inject([AutenticacaoService], (service: AutenticacaoService) => {
    expect(service).toBeTruthy();
  }));
});
