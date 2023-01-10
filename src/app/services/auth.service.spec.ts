import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireAuth} from "@angular/fire/compat/auth";

describe('AuthService', () => {
  let service: AuthService;
  let angularFireAuthSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AngularFireAuth, useValue: angularFireAuthSpy}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
