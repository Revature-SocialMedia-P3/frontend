import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import {VALID_POST_1} from "../../../tools/tools";

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.inputComment = VALID_POST_1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
