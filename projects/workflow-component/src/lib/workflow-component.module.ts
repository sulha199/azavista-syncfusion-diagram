import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams'
import { WorkflowDiagramComponent } from './components/workflow-diagram/workflow-diagram.component'
import { WorkflowProcessConfirmationEmailComponent } from './components/workflow-process-confirmation-email/workflow-process-confirmation-email.component'
import { WorkflowProcessConfirmationPageComponent } from './components/workflow-process-confirmation-page/workflow-process-confirmation-page.component'
import { WorkflowProcessFormComponent } from './components/workflow-process-form/workflow-process-form.component'
import { WorkflowStageFormComponent } from './components/workflow-stage-form/workflow-stage-form.component'
import { WorkflowComponentComponent } from './workflow-component.component'



@NgModule({
  declarations: [
    WorkflowComponentComponent,

    WorkflowDiagramComponent,
    WorkflowStageFormComponent,
    WorkflowProcessFormComponent,
    WorkflowProcessConfirmationEmailComponent,
    WorkflowProcessConfirmationPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    // import the DiagramModule for the Diagram component
    DiagramModule,
  ],
  exports: [
    WorkflowComponentComponent,
    WorkflowDiagramComponent,
    DiagramModule
  ]
})
export class WorkflowComponentModule { }
