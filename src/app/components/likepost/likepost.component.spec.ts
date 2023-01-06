import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikepostComponent } from './likepost.component';

describe('LikepostComponent', () => {
  let component: LikepostComponent;
  let fixture: ComponentFixture<LikepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikepostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
