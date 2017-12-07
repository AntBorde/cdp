import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectParticipateComponent } from './project-participate.component';

describe('ProjectParticipateComponent', () => {
  let component: ProjectParticipateComponent;
  let fixture: ComponentFixture<ProjectParticipateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectParticipateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectParticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
