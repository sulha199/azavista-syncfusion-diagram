import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { EventWorkflowTemplateType, IEmailCampaignType, IEventWorkflow, PageType } from '@azavista/servicelib'
import {
  ConnectorModel,
  DiagramTools, PageSettingsModel, SnapConstraints, SnapSettingsModel
} from '@syncfusion/ej2-angular-diagrams'
import { WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT, WORKFLOW_DIAGRAM_NODE_DEFAULT, WORKFLOW_DIAGRAM_NODE_MARGIN, WORKFLOW_HISTORY_MANAGER } from 'projects/workflow-component/src/lib/consts'
import { GroupType, workflowDataToDiagramNode } from 'projects/workflow-component/src/lib/helpers'
import { CustomDiagramComponent, WorkflowDiagramAddNodeOptions, WorkflowDiagramNode, WorkflowStage } from '../../models'

const snapSettings: SnapSettingsModel = {
  constraints: SnapConstraints.None
}
const pageSettings: PageSettingsModel = {
  background: {
    color: 'var(--bg-color-grey)',
  }
}
@Component({
  selector: 'azavista-workflow-diagram',
  templateUrl: './workflow-diagram.component.html',
  styleUrls: ['./workflow-diagram.component.scss'],
})
export class WorkflowDiagramComponent implements OnInit {
  @Input() eventId?: string;
  @Input() workflows: IEventWorkflow[] = []
  @Input() emailCampaignsGetter?: (eventId: string, type: PageType) => Promise<IEmailCampaignType[]>
  @Input() pagesGetter?: (eventId: string, type: PageType) => Promise<IEmailCampaignType[]>;

  nodes: WorkflowDiagramNode[] = []
  connectors: ConnectorModel[] = []

  tool: DiagramTools =  DiagramTools.ContinuousDraw
  historyManager = WORKFLOW_HISTORY_MANAGER
  snapSettings = snapSettings
  pageSettings = pageSettings

  @ViewChild('diagram')
  public diagram?: CustomDiagramComponent<WorkflowDiagramNode>;

  ngOnInit(): void {
    const { connectors, nodes } = workflowDataToDiagramNode(this.workflows);
    this.nodes = nodes;
    this.connectors = connectors;
  }

  onAdd({ node, position }: WorkflowDiagramAddNodeOptions) {
    const currentNode = this.diagram?.getNodeObject(node.id)
    if (currentNode == null) { return }
    const newId = `node_${new Date().getTime()}`;
    const newNode: WorkflowDiagramNode = {
      ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
      id: newId,
      offsetX:
        (currentNode.offsetX ?? 0) +
        (position === 'right'
          ? (currentNode.width ?? currentNode.minWidth ?? 100) + WORKFLOW_DIAGRAM_NODE_MARGIN
          : 0),
      offsetY:
        (currentNode.offsetY ?? 0) +
        (position === 'bottom'
          ? (currentNode.height ?? currentNode.minHeight ?? 100) + WORKFLOW_DIAGRAM_NODE_MARGIN
          : 0),
      addInfo: {
        title: newId,
        processes: [],
        type: EventWorkflowTemplateType.cancellation,
        settings: {} as any
      },
    };

    const newConnector: ConnectorModel = {
      ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT,
      sourceID: currentNode.id,
      targetID: newId,
    }

    this.diagram?.startGroupAction()
    this.diagram?.addNode(newNode);
    this.diagram?.addConnector(newConnector)
    this.diagram?.endGroupAction()
  }

  updateStage(stageValue: FormGroup<GroupType<WorkflowStage>>['value'], prevNode: WorkflowDiagramNode) {
    const currentNode = this.diagram?.nodes.find(({id}) => id ===prevNode.id)
    if (currentNode?.addInfo?.processes == undefined) { return }
    this.diagram?.historyManager.push?.({
      object: currentNode,
      prevState: currentNode.addInfo
    })
    currentNode.addInfo = {...currentNode.addInfo, ...stageValue as any, version: `${(new Date).getTime()}`}
    this.diagram?.dataBind()
  }

  updateHeight(prevNode: WorkflowDiagramNode, height: number) {
    const currentNode = this.diagram?.nodes.find(({id}) => id === prevNode.id)
    if (currentNode?.addInfo?.processes == undefined) { return }
    if (currentNode.height === height) { return }
    currentNode.height = height;
    // eslint-disable-next-line no-self-assign
    currentNode.offsetY = currentNode.offsetY;
    this.diagram?.dataBind()
  }

  created = () => {
    // this.nodes.forEach(node => this.diagram?.addNode(node))
    this.connectors.forEach(connector => this.diagram?.addConnector(connector))
  }

  undo() {
    this.diagram?.undo()
    this.diagram?.refresh()
  }
  redo() {
    this.diagram?.redo()
    this.diagram?.refresh()
  }
}
