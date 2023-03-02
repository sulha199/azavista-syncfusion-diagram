import { ConnectorModel } from '@syncfusion/ej2-angular-diagrams'
import {
  CustomHistory,
  CustomHistoryEntry,
  WorkflowDiagramNode,
  WorkflowProcessType,
  WorkflowStageType
} from 'projects/workflow-component/src/lib/models'

/* margin in px */
export const WORKFLOW_DIAGRAM_NODE_MARGIN = 50
export const WORKFLOW_DIAGRAM_NODE_DEFAULT: Pick<
  WorkflowDiagramNode,
  'offsetY' | 'minHeight' | 'width' | 'shape'
> = {
  minHeight: 100,
  width: 230,
  shape: { type: 'HTML' },
  offsetY: 160,
}
export const WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT: ConnectorModel = {
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

// History Manager
export const WORKFLOW_CUSTOM_UNDO_REDO = (
  args: CustomHistoryEntry<WorkflowDiagramNode>
) => {
  const node = args.object
  const currentState = node.addInfo

  //Resets the state
  node.addInfo = args.prevState

  //Saves the previous state
  args.prevState = currentState
}
export const WORKFLOW_HISTORY_MANAGER: CustomHistory<WorkflowDiagramNode> = {
  undo: WORKFLOW_CUSTOM_UNDO_REDO,
  redo: WORKFLOW_CUSTOM_UNDO_REDO,
}

export const WORKFLOW_STAGE_PROCESSES_MAP: Record<
  WorkflowStageType,
  WorkflowProcessType[]
> = {
  invitation: ['confirmationEmail'],
  registration: ['form', 'confirmationPage', 'confirmationEmail'],
  'post-registration': ['confirmationPage', 'confirmationEmail'],
  arrival: ['form', 'confirmationPage', 'confirmationEmail'],
  cancellation: ['confirmationEmail'],
  decline: ['confirmationEmail'],
}

type WorkflowStageProp = {
  label: string
  description: string
}

export const WORKFLOW_STAGE_PROPS_MAP: Record<WorkflowStageType, WorkflowStageProp> = {
  invitation: {
    label: 'Invitation',
    description:
      'An invitation block is used to start the event process by inviting the audience.  ',
  },
  registration: {
    label: 'Registration',
    description:
      'An invitation block is used to start the event process by inviting the audience.  ',
  },
  'post-registration': {
    label: 'Registered Participants',
    description:
      'An invitation block is used to start the event process by inviting the audience.  ',
  },
  arrival: {
    label: 'Arrival',
    description:
      'An invitation block is used to start the event process by inviting the audience.  ',
  },
  cancellation: {
    label: 'Cancellation',
    description:
      'An invitation block is used to start the event process by inviting the audience.  ',
  },
  decline: {
    label: 'Decline',
    description:
      'An invitation block is used to start the event process by inviting the audience.  ',
  },
}
