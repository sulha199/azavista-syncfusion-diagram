import { TestBed } from '@angular/core/testing';

import { WorkflowComponentService } from './workflow-component.service';

describe('WorkflowComponentService', () => {
  let service: WorkflowComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
