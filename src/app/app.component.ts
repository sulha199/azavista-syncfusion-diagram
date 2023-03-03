import { Component } from '@angular/core'
import { mockWorkflows } from 'projects/workflow-component/src/lib/mocks'

@Component({
  selector: 'azavista-workflow-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'azavista-syncfusion-diagram';
  workflows = mockWorkflows;
}
