import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritecarsComponent } from './favoritecars.component';

describe('FavoritecarsComponent', () => {
  let component: FavoritecarsComponent;
  let fixture: ComponentFixture<FavoritecarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritecarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritecarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
