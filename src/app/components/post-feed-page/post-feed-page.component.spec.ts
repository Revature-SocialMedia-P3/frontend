import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeedPageComponent } from './post-feed-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let fixture: ComponentFixture<PostFeedPageComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFeedPageComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
