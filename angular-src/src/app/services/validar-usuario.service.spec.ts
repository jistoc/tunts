/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidarUsuarioService } from './validar-usuario.service';

describe('ValidarUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidarUsuarioService]
    });
  });

  it('should ...', inject([ValidarUsuarioService], (service: ValidarUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
