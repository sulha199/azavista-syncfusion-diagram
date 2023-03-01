import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { UndoRedoService } from '@syncfusion/ej2-angular-diagrams'
import { WorkflowComponentModule } from 'projects/workflow-component/src/public-api'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // import the DiagramModule for the Diagram component
    WorkflowComponentModule,
  ],
  providers: [UndoRedoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
