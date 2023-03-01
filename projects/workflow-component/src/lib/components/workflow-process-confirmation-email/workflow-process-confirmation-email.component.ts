import { Component, Input } from '@angular/core'
import { ControlType } from 'projects/workflow-component/src/lib/helpers'
import { WorkflowProcessConfirmationEmail, workflowProcessConfirmationEmailOptions } from '../../models'


@Component({
  selector: 'azavista-workflow-process-confirmation-email',
  templateUrl: './workflow-process-confirmation-email.component.html',
  styleUrls: ['./workflow-process-confirmation-email.component.scss']
})
export class WorkflowProcessConfirmationEmailComponent {
  @Input() processForm?: ControlType<WorkflowProcessConfirmationEmail>
  options = workflowProcessConfirmationEmailOptions
}
