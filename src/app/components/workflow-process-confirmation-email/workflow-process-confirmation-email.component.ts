import { Component, Input } from '@angular/core'
import { ControlType } from 'src/app/helpers'
import { WorkflowProcessConfirmationEmail, workflowProcessConfirmationEmailOptions } from 'src/app/models'

@Component({
  selector: 'app-workflow-process-confirmation-email',
  templateUrl: './workflow-process-confirmation-email.component.html',
  styleUrls: ['./workflow-process-confirmation-email.component.scss']
})
export class WorkflowProcessConfirmationEmailComponent {
  @Input() processForm?: ControlType<WorkflowProcessConfirmationEmail>
  options = workflowProcessConfirmationEmailOptions
}
