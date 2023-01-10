import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import {VALID_POST_1, VALID_POST_ARRAY, VALID_USER} from "../../../tools/tools";
import {PostService} from "../../services/post.service";
import {sample} from "rxjs";

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj(
      "AuthService",
      [],
    {"currentUser": VALID_USER}
    )

    postServiceSpy = jasmine.createSpyObj(
      "PostService",
      {"getAllTopPosts": {"subscribe": VALID_POST_ARRAY}},
      {}
    )
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    component.post = VALID_POST_1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
