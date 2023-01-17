import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeedComponent } from './my-feed.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {asyncData, VALID_USER} from "../../../tools/tools";

describe('MyFeedComponent', () => {
  let component: MyFeedComponent;
  let fixture: ComponentFixture<MyFeedComponent>;
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
      declarations: [ MyFeedComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: PostService, useValue: postServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
