import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsByGenreComponent } from './achievements-by-genre.component';

describe('AchievementsByGenreComponent', () => {
  let component: AchievementsByGenreComponent;
  let fixture: ComponentFixture<AchievementsByGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementsByGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsByGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
