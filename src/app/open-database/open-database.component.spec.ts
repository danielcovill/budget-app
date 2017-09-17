import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDatabaseComponent } from './open-database.component';

describe('OpenDatabaseComponent', () => {
  let component: OpenDatabaseComponent;
  let fixture: ComponentFixture<OpenDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
