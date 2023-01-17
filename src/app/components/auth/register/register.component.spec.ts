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
      ["backendLogin"],
      {"changeInUser": {"subscribe": () => {return null}}}
    )

    angularFireAuthSpy = jasmine.createSpyObj(
      "AngularFireAuth",
      ["createUserWithEmailAndPassword"],
      {}
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

  it('should register a user', function () {
    component.registerForm.get("email")?.setValue("validEmail@email.com");
    component.registerForm.get("password")?.setValue("ValidPassword");
    component.registerForm.get("username")?.setValue("ValidUsername");

    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    // @ts-ignore
    angularFireAuthSpy.createUserWithEmailAndPassword.and.returnValue(Promise.resolve({}))

    expect(component.isSubmitted).toBeFalse();
    component.onSubmit();
    expect(component.isSubmitted).toBeTrue()
    fixture.whenStable().then(()=> {}).then(()=> {})
  });

  it('should fail when username is already taken', function (done) {
    component.registerForm.get("email")?.setValue("copyOfValidEmail@email.com");
    component.registerForm.get("password")?.setValue("ValidPassword");
    component.registerForm.get("username")?.setValue("ValidUsername");

    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    // @ts-ignore
    angularFireAuthSpy.createUserWithEmailAndPassword.and.returnValue(Promise.reject({code: "auth/email-already-in-use"}))

    expect(component.isSubmitted).toBeFalse();
    component.onSubmit();
    expect(component.isSubmitted).toBeTrue()
    fixture.whenStable().then(()=> {

    }).then(()=> {
      expect(component.errorMessage).toEqual("Failed to register. This email is already in use. If you logged in previously with an account like facebook or google, please use the same method.");
      expect(component.isSubmitted).toBeFalse();
      done()
    })
  });
  it('should fail when password is weak', function (done) {
    component.registerForm.get("email")?.setValue("copyOfValidEmail@email.com");
    component.registerForm.get("password")?.setValue("ValidPassword");
    component.registerForm.get("username")?.setValue("ValidUsername");

    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    // @ts-ignore
    angularFireAuthSpy.createUserWithEmailAndPassword.and.returnValue(Promise.reject({code: "auth/weak-password"}))

    expect(component.isSubmitted).toBeFalse();
    component.onSubmit();
    expect(component.isSubmitted).toBeTrue()
    fixture.whenStable().then(()=> {

    }).then(()=> {
      expect(component.errorMessage).toEqual("Failed to register. Password is too weak.");
      expect(component.isSubmitted).toBeFalse();
      done()
    })
  });

  it('should display a generic error message', function (done) {
    component.registerForm.get("email")?.setValue("copyOfValidEmail@email.com");
    component.registerForm.get("password")?.setValue("ValidPassword");
    component.registerForm.get("username")?.setValue("ValidUsername");

    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    // @ts-ignore
    angularFireAuthSpy.createUserWithEmailAndPassword.and.returnValue(Promise.reject({}))

    expect(component.isSubmitted).toBeFalse();
    component.onSubmit();
    expect(component.isSubmitted).toBeTrue()
    fixture.whenStable().then(()=> {

    }).then(()=> {
      expect(component.errorMessage).toEqual("Failed to register. Please try again.");
      expect(component.isSubmitted).toBeFalse();
      done()
    })
  });
});
