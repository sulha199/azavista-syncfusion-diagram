import { ChangeDetectorRef, Component, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import {
  ConnectorModel,
  DiagramTools, NodeModel, PageSettingsModel, SnapConstraints, SnapSettingsModel
} from '@syncfusion/ej2-angular-diagrams'
import { WORKFLOW_DIAGRAM_NODE_MARGIN } from 'src/app/consts'
import { GroupType } from 'src/app/helpers'
import { nodesConnectorDummy, nodesDummy } from 'src/app/mocks'
import {
  CustomDiagramComponent,
  CustomHistory,
  CustomHistoryEntry,
  WorkflowDiagramAddNodeOptions,
  WorkflowDiagramNode,
  WorkflowStage
} from 'src/app/models'

@Component({
  selector: 'app-workflow-diagram',
  templateUrl: './workflow-diagram.component.html',
  styleUrls: ['./workflow-diagram.component.scss'],
})
export class WorkflowDiagramComponent {
  tool: DiagramTools =  DiagramTools.ContinuousDraw
  nodes = nodesDummy
  connectors = nodesConnectorDummy
  historyManager = this.createHistorymanager()
  snapSettings: SnapSettingsModel  = {
    constraints: SnapConstraints.None
  }
  pageSettings: PageSettingsModel = {
    background: {
      color: 'var(--bg-color-grey)',
    }
  }

  @ViewChild('diagram')
  public diagram?: CustomDiagramComponent<WorkflowDiagramNode>;

  constructor(private cdr: ChangeDetectorRef) {}

  onAdd({ node, position }: WorkflowDiagramAddNodeOptions) {
    const currentNode = this.diagram?.getNodeObject(node.id)
    if (currentNode == null) { return }
    const newId = `node_${new Date().getTime()}`;
    const newNode: WorkflowDiagramNode = {
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
      width: 230,
      minHeight: 300,
      shape: { type: 'HTML' },
      addInfo: {
        title: newId,
        processes: [],
        type: 'cancellation'
      },
    };

    const newConnector: ConnectorModel = {
      sourceID: currentNode.id,
      targetID: newId,
      cornerRadius: 10,
      type: 'Orthogonal'
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
    currentNode.addInfo = currentNode.addInfo
    this.diagram?.dataBind()
    this.diagram?.refresh()
  }

  created = () => {
    this.nodes.forEach(node => this.diagram?.addNode(node))
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

  createHistorymanager() {
    return {
      undo: this.customUndoRedo,
      redo: this.customUndoRedo
    } as CustomHistory<WorkflowDiagramNode>
  }

  customUndoRedo = <T extends NodeModel>(args: CustomHistoryEntry<WorkflowDiagramNode>) => {
    const node = args.object;
    var currentState = node.addInfo;

    //Resets the state
    node.addInfo = args.prevState;

    //Saves the previous state
    args.prevState = currentState;
  }
}
