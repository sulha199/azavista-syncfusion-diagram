import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WorkflowProcessFormComponent } from './workflow-process-form.component'

describe('WorkflowProcessFormComponent', () => {
  let component: WorkflowProcessFormComponent;
  let fixture: ComponentFixture<WorkflowProcessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowProcessFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
