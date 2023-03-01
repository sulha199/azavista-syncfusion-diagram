import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStageFormComponent } from './workflow-stage-form.component';

describe('WorkflowStageFormComponent', () => {
  let component: WorkflowStageFormComponent;
  let fixture: ComponentFixture<WorkflowStageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowStageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowStageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
