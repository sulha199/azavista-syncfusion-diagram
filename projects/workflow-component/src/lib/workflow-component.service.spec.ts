import { TestBed } from '@angular/core/testing';

import { EventWorkflowService } from './workflow-component.service';

describe('WorkflowComponentService', () => {
  let service: EventWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
