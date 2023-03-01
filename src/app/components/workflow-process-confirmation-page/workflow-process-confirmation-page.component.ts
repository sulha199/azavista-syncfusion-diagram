import { Component, Input } from '@angular/core'
import { ControlType } from 'src/app/helpers'
import { WorkflowProcessConfirmationPage, workflowProcessConfirmationPageOptions } from 'src/app/models'

@Component({
  selector: 'app-workflow-process-confirmation-page',
  templateUrl: './workflow-process-confirmation-page.component.html',
  styleUrls: ['./workflow-process-confirmation-page.component.scss']
})
export class WorkflowProcessConfirmationPageComponent {
  @Input() processForm?: ControlType<WorkflowProcessConfirmationPage>
  options = workflowProcessConfirmationPageOptions
}
