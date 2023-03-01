import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowComponentComponent } from './workflow-component.component';

describe('WorkflowComponentComponent', () => {
  let component: WorkflowComponentComponent;
  let fixture: ComponentFixture<WorkflowComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
