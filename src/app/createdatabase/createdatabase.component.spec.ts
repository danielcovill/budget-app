import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedatabaseComponent } from './createdatabase.component';

describe('CreatedatabaseComponent', () => {
  let component: CreatedatabaseComponent;
  let fixture: ComponentFixture<CreatedatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
