import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratedFeedComponent } from './integrated-feed.component';

describe('IntegratedFeedComponent', () => {
  let component: IntegratedFeedComponent;
  let fixture: ComponentFixture<IntegratedFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegratedFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegratedFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
