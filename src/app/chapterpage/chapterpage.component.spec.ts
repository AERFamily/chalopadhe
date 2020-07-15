import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterpageComponent } from './chapterpage.component';

describe('ChapterpageComponent', () => {
  let component: ChapterpageComponent;
  let fixture: ComponentFixture<ChapterpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
