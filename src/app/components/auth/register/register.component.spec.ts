import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let angularFireAuthSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj(
      "AuthService",
      [],
      {"changeInUser": {"subscribe": () => {return null}}}
    )

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
