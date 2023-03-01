import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { DiagramModule, UndoRedoService } from '@syncfusion/ej2-angular-diagrams'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { WorkflowDiagramComponent } from './components/workflow-diagram/workflow-diagram.component'
import { WorkflowProcessConfirmationEmailComponent } from './components/workflow-process-confirmation-email/workflow-process-confirmation-email.component'
import { WorkflowProcessConfirmationPageComponent } from './components/workflow-process-confirmation-page/workflow-process-confirmation-page.component'
import { WorkflowProcessFormComponent } from './components/workflow-process-form/workflow-process-form.component'
import { WorkflowStageFormComponent } from './components/workflow-stage-form/workflow-stage-form.component'

@NgModule({
  declarations: [
    AppComponent,
    WorkflowDiagramComponent,
    WorkflowStageFormComponent,
    WorkflowProcessFormComponent,
    WorkflowProcessConfirmationEmailComponent,
    WorkflowProcessConfirmationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // import the DiagramModule for the Diagram component
    DiagramModule
  ],
  providers: [UndoRedoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
