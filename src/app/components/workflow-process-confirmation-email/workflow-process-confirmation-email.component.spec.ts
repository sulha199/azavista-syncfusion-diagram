import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WorkflowProcessConfirmationEmailComponent } from './workflow-process-confirmation-email.component'

describe('WorkflowProcessConfirmationEmailComponent', () => {
  let component: WorkflowProcessConfirmationEmailComponent;
  let fixture: ComponentFixture<WorkflowProcessConfirmationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowProcessConfirmationEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowProcessConfirmationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
