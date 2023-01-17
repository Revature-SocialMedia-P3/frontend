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
      ["backendLogin", "getUser"],
      {"changeInUser": {"subscribe": () => {return null}}}
    )

    angularFireAuthSpy = jasmine.createSpyObj(
      "AngularFireAuth",
      ["signInWithEmailAndPassword", "signInWithPopup"],
      {}
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log the user in with proper credentials', function () {

    component.loginForm.get("email")?.setValue("validemail@email.com");
    component.loginForm.get("password")?.setValue("validPassword");

    authServiceSpy.backendLogin.and.returnValue(Promise.resolve())
    // @ts-ignore
    angularFireAuthSpy.signInWithEmailAndPassword.and.returnValue(Promise.resolve({}))

    expect(component.isSubmitted).toBeFalse();
    component.onSubmit()
  });

  it('should display error message when failing',  (done) => {

    component.loginForm.get("email")?.setValue("validemail@email.com");
    component.loginForm.get("password")?.setValue("validPassword");

    authServiceSpy.backendLogin.and.returnValue(Promise.resolve())
    // @ts-ignore
    angularFireAuthSpy.signInWithEmailAndPassword.and.returnValue(Promise.reject({}))

    expect(component.isSubmitted).toBeFalse();
    component.onSubmit()
    expect(component.isSubmitted).toBeTrue();
    fixture.whenStable().then().then(() => {
        expect(component.isSubmitted).toBeFalse();
        expect(component.errorMessage).toEqual("Failed to log in. Please try again.");
        done()
      })
  });

  it('should log in with facebook', function (done) {
    // @ts-ignore
    angularFireAuthSpy.signInWithPopup.and.returnValue(Promise.resolve({}));
    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    expect(component.isSubmitted).toBeFalse();
    component.OAuth("facebook")

    expect(component.isSubmitted).toBeTrue();
    fixture.whenStable().then(() => {
    }).then(() => {
      done()
    })
  });

  it('should log in with google', function (done) {
    // @ts-ignore
    angularFireAuthSpy.signInWithPopup.and.returnValue(Promise.resolve({}));
    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    expect(component.isSubmitted).toBeFalse();
    component.OAuth("google")

    expect(component.isSubmitted).toBeTrue();
    fixture.whenStable().then(() => {
    }).then(() => {
      done()
    })
  });

  it('should log in with github', function (done) {
    // @ts-ignore
    angularFireAuthSpy.signInWithPopup.and.returnValue(Promise.resolve({}));
    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    expect(component.isSubmitted).toBeFalse();
    component.OAuth("github")

    expect(component.isSubmitted).toBeTrue();
    fixture.whenStable().then(() => {
    }).then(() => {
      done()
    })
  });

  it('should provide an appropriate error message', function (done) {
    // @ts-ignore
    angularFireAuthSpy.signInWithPopup.and.returnValue(Promise.reject({code: "auth/account-exists-with-different-credential"}));
    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    expect(component.isSubmitted).toBeFalse();
    component.OAuth("github");
    expect(component.isSubmitted).toBeTrue();

    fixture.whenStable().then(() => {}).catch(() => {}).then(() => {
      expect(component.errorMessage).toEqual("Failed to log in. If you logged in previously with an account like facebook or google, please use the same method.");
      expect(component.isSubmitted).toBeFalse();
      done();
    })
  });

  it('should provide a generic error message', function (done) {
    // @ts-ignore
    angularFireAuthSpy.signInWithPopup.and.returnValue(Promise.reject({code: ""}));
    authServiceSpy.backendLogin.and.returnValue(Promise.resolve());

    expect(component.isSubmitted).toBeFalse();
    component.OAuth("github");
    expect(component.isSubmitted).toBeTrue();

    fixture.whenStable().then(() => {}).catch(() => {}).then(() => {
      expect(component.errorMessage).toEqual("Failed to log in. Please try again.");
      expect(component.isSubmitted).toBeFalse();
      done();
    })
  });
});
