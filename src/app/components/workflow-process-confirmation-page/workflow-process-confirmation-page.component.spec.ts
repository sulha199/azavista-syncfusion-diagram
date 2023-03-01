import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WorkflowProcessConfirmationPageComponent } from './workflow-process-confirmation-page.component'

describe('WorkflowProcessConfirmationPageComponent', () => {
  let component: WorkflowProcessConfirmationPageComponent;
  let fixture: ComponentFixture<WorkflowProcessConfirmationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowProcessConfirmationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowProcessConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
