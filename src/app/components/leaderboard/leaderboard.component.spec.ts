import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardComponent } from './leaderboard.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {asyncData, VALID_USER} from "../../../tools/tools";

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj(
      "authService",
      {},
      {changeInUser: asyncData(VALID_USER)}
    )
    postServiceSpy = jasmine.createSpyObj(
      "PostService",
      {},
      {changeInPost: asyncData(undefined)}
    )
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: PostService, useValue: postServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
