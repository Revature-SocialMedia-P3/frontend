import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../../../services/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let angularFireAuthSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj(
      "AuthService",
      [],
      {"changeInUser": {"subscribe": () => {return null}}}
    )

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
      FormBuilder,
        {provide: AngularFireAuth, useValue: angularFireAuthSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
