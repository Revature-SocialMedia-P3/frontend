import {fakeAsync, TestBed} from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {asyncData, asyncDataFailure, VALID_USER} from "../../tools/tools";
import {RouterTestingModule} from "@angular/router/testing";
import {defer, Observable} from "rxjs";
import User from "../models/User";
import {Injectable} from "@angular/core";


describe('AuthService', () => {
  let service: AuthService;
  let angularFireAuthSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    localStorage.setItem("User", JSON.stringify(VALID_USER));
    localStorage.setItem("Authorization", "ValidJWT");
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: AngularFireAuth, useValue: angularFireAuthSpy},
      ]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.removeItem("User");
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log the user out', function () {
    service.logout();

    const localStorageAuthorization = localStorage.getItem("Authorization");
    const localStorageUser = localStorage.getItem("User");
    const user = service.currentUser;

    expect(localStorageAuthorization).toBeNull();
    expect(localStorageUser).toBeNull();
    expect(user).toBeNull()
  });

  it('should set the current user', function () {
    const testUser = {email: "testUser@email.com", id: 420, username: "testUser"}

    expect(service.currentUser).toEqual(VALID_USER);

    service.setCurrentUser(testUser);

    expect(service.currentUser).toEqual(testUser);
  });

  it('should return an Observable if it gets valid user', function () {
    const result = service.getUser(VALID_USER)

    expect(result).toBeInstanceOf(Observable);
  });

  // TODO
  it('should correctly log in a user with no username given', async () => {

    const data = {user: {
      multiFactor: {
        user: {
          email: "newEmail@email.com",
          accessToken: "totallyNewAccessToken"
        }
      }
    }}

    spyOn<any>(service, "getUser").and.returnValue(asyncData({
      id: 25,
      email: data.user.multiFactor.user.email,
    }))

    await service.backendLogin(data, () => {}, () => {});

    expect(service.currentUser?.username).not.toEqual(VALID_USER.username);
    expect(service.currentUser?.email).toEqual(data.user.multiFactor.user.email);
    expect(localStorage.getItem("Authorization")).toEqual("Bearer " + data.user.multiFactor.user.accessToken);
  });

  it('should correctly log in a user with a username given', async function () {

    const data = {user: {
        multiFactor: {
          user: {
            email: "newEmail@email.com",
            accessToken: "totallyNewAccessToken"
          }
        }
      }}

    spyOn<any>(service, "getUser").and.returnValue(asyncData({
      id: 25,
      email: data.user.multiFactor.user.email,
      username: "totally unique username"
    }))

    await service.backendLogin(data, ()=>{}, ()=>{}, "totally unique username")

    expect(service.currentUser?.username).not.toEqual(VALID_USER.username)
    expect(service.currentUser?.email).toEqual(data.user.multiFactor.user.email)
    expect(localStorage.getItem("Authorization")).toEqual("Bearer " + data.user.multiFactor.user.accessToken);

  });

  it('should fail', () => {

    const data = {user: {
        multiFactor: {
          user: {
            email: "newEmail@email.com",
            accessToken: "totallyNewAccessToken"
          }
        }
      }};

    spyOn<any>(service, "getUser").and.returnValue(asyncDataFailure({}));

    service.backendLogin(data, () => {}, () => {});

    expect(service.currentUser?.username).toEqual(VALID_USER.username);
    expect(service.currentUser?.email).not.toEqual(data.user.multiFactor.user.email);
    expect(localStorage.getItem("Authorization")).toEqual("Bearer " + data.user.multiFactor.user.accessToken);
  });
});
