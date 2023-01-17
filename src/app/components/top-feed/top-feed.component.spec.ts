import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFeedComponent } from './top-feed.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import {asyncData, VALID_USER} from "../../../tools/tools";
import {PostService} from "../../services/post.service";

describe('TopFeedComponent', () => {
  let component: TopFeedComponent;
  let fixture: ComponentFixture<TopFeedComponent>;
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
      declarations: [ TopFeedComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: PostService, useValue: postServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
