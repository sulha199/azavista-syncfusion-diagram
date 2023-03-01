import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { debounceTime } from 'rxjs'
import { ControlType } from 'src/app/helpers'
import { WorkflowProcessForm, workflowProcessFormOptions } from 'src/app/models'

@Component({
  selector: 'app-workflow-process-form',
  templateUrl: './workflow-process-form.component.html',
  styleUrls: ['./workflow-process-form.component.scss']
})
export class WorkflowProcessFormComponent implements OnInit, OnDestroy{
  options = workflowProcessFormOptions
  @Input() processForm?: ControlType<WorkflowProcessForm>

  @Output() processChange = new EventEmitter<ControlType<WorkflowProcessForm>['value']>

  ngOnInit(): void {
    this.processForm?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => this.processChange.emit(value))
  }

  ngOnDestroy(): void {
    if (this.processForm?.touched) {
      this.processChange.emit(this.processForm.value)
    }
  }
}
