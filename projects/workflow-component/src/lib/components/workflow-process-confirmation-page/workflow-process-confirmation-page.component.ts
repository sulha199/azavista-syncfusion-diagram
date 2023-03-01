import { Component, Input } from '@angular/core'
import { ControlType } from 'projects/workflow-component/src/lib/helpers'
import { WorkflowProcessConfirmationPage, workflowProcessConfirmationPageOptions } from '../../models'


@Component({
  selector: 'azavista-workflow-process-confirmation-page',
  templateUrl: './workflow-process-confirmation-page.component.html',
  styleUrls: ['./workflow-process-confirmation-page.component.scss']
})
export class WorkflowProcessConfirmationPageComponent {
  @Input() processForm?: ControlType<WorkflowProcessConfirmationPage>
  options = workflowProcessConfirmationPageOptions
}
