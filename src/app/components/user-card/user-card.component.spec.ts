import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import { VALID_USER} from "../../../tools/tools";
import {FormBuilder} from "@angular/forms";
import {linkWithCredential} from "@angular/fire/auth";
import {EmailAuthProvider, getAuth, linkWithPopup} from "firebase/auth";
import {BehaviorSubject} from "rxjs";
import {initializeApp} from "firebase/app";
import {FirebaseApp} from "@angular/fire/app";

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let app: FirebaseApp;
  let gaSpy: jasmine.Spy<typeof getAuth>;
  let lwpSpy: jasmine.Spy<typeof linkWithPopup>;
  let lwcSpy: jasmine.Spy<typeof linkWithCredential>;
  let emailAuthProviderSpy: jasmine.SpyObj<EmailAuthProvider>;

  beforeEach(async () => {

      app = initializeApp({
      apiKey: "fakeAPIKey",
      authDomain: "fakeApp.firebaseapp.com",
      projectId: "fakeApp",
      storageBucket: "fakeApp.appspot.com",
      messagingSenderId: "689679867",
      appId: "897489w75892478573408",
      measurementId: "J-JFKDHGJKS",
      // vapidKey: "AhdkfdjJKDjkslFJKlJKLFBDJKLJK"
    });

    authServiceSpy = jasmine.createSpyObj(
      "AuthService",
      [],
      {"changeInUser": new BehaviorSubject(VALID_USER)}
    )

    emailAuthProviderSpy = jasmine.createSpyObj(
      "EmailAuthProvider",
      ["credential"],
      []
    )

    gaSpy = jasmine.createSpy("getAuth", getAuth);
    lwpSpy = jasmine.createSpy("linkWithPopup", linkWithPopup);
    lwcSpy = jasmine.createSpy("linkWithCredential", linkWithCredential);

    await TestBed.configureTestingModule({
      declarations: [ UserCardComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        FormBuilder,
        {provide: EmailAuthProvider, useValue: emailAuthProviderSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link with google account', function () {
    // @ts-ignore
    lwpSpy.and.resolveTo({});
    // @ts-ignore
    gaSpy.and.returnValue({currentUser: {email: VALID_USER.email}});

    component.OAuth("google");

  });

  it('should link with facebook account', function () {

    // @ts-ignore
    lwpSpy.and.resolveTo({});
    // @ts-ignore
    gaSpy.and.returnValue({currentUser: {email: VALID_USER.email}});

    component.OAuth("facebook");

  });

  it('should link with github account', function () {
    // createSpy("linkWithPopup").and.callFake(() => {return Promise.resolve({})})
    // @ts-ignore
    lwpSpy.and.resolveTo({});
    // @ts-ignore
    gaSpy.and.returnValue({currentUser: {email: VALID_USER.email}});

    component.OAuth("github");

  });

  it('should link with email', function (done) {

    // @ts-ignore
    lwcSpy.and.resolveTo({});
    // @ts-ignore
    gaSpy.and.returnValue({currentUser: {email: VALID_USER.email}});
    // emailAuthProviderSpy.and.return

    component.emailPasswordForm.get("emailAuth")?.setValue(VALID_USER.email);
    component.emailPasswordForm.get("password")?.setValue("ValidPassword");

    expect(component.isEmailPasswordAuthSubmitted).toBeFalse();
    component.OAuth("email");
    expect(component.isEmailPasswordAuthSubmitted).toBeTrue();
    fixture.whenStable().then(() => {

    }).then(() => {
      done()
    })

  });
});
