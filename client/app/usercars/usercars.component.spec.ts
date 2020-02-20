import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercarsComponent } from './usercars.component';

describe('UsercarsComponent', () => {
  let component: UsercarsComponent;
  let fixture: ComponentFixture<UsercarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
