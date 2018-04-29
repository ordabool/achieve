import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementBoxComponent } from './achievement-box.component';

describe('AchievementBoxComponent', () => {
  let component: AchievementBoxComponent;
  let fixture: ComponentFixture<AchievementBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
