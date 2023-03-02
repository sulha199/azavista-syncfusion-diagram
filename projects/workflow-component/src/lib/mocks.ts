import { ConnectorModel } from '@syncfusion/ej2-angular-diagrams'
import { WORKFLOW_DIAGRAM_NODE_DEFAULT } from './consts'
import { WorkflowDiagramNode } from './models'

export const nodesDummy: WorkflowDiagramNode[] = [
  {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    id: 'node1_templatex',
    offsetX: 160,
    offsetY: 250,
    addInfo: {
      type: 'invitation',
      title: 'Invitation',
      processes: []
    },
  },
  {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    id: 'node1_template2',
    offsetX: 480,
    offsetY: 170,
    addInfo: {
      type: 'registration',
      title: 'Registration',
      processes: []
    },
  },
  {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    id: 'node1_template3',
    offsetX: 790,
    offsetY: 180,
    addInfo: {
      type: 'post-registration',
      title: 'Registered Participants',
      processes: []
    },
  },
  {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    id: 'node1_template4',
    offsetX: 1090,
    offsetY: 280,
    addInfo: {
      type: 'arrival',
      title: 'arrival',
      processes: []
    },
  },
]

export const nodesConnectorDummy: ConnectorModel[] = nodesDummy.slice(1).map((target, index) => {
  const source = nodesDummy[index]
  return {
    sourceID: source.id,
    targetID: target.id,
    cornerRadius: 10,
    type: 'Orthogonal',
    sourceDecorator: {
      style: {
        strokeWidth: 1,
      },
      shape: 'Circle'
    },
    sourcePadding: 10
  }
})
