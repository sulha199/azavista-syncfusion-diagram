import { ConnectorModel, DiagramComponent, History, Node, NodeModel } from '@syncfusion/ej2-angular-diagrams'

export const workflowProcessFormOptions = ['registration-form', 'cancellation-form', 'survey-form' ] as const
export const workflowProcessConfirmationEmailOptions = ['registration-email', 'cancellation-email', 'confirmation-email' ] as const
export const workflowProcessConfirmationPageOptions = ['registration-page', 'cancellation-page', 'confirmation-page', 'thank-you-page' ] as const

type WorkflowProcessFormOption = typeof workflowProcessFormOptions[number]
type WorkflowProcessConfirmationEmailOption = typeof workflowProcessConfirmationEmailOptions[number]
type WorkflowProcessConfirmationPageOption = typeof workflowProcessConfirmationPageOptions[number]

export type WorkflowStageType = 'invitation' | 'registration' | 'post-registration' | 'arrival' | 'cancellation' | 'decline'

export type WorkflowStage = {
  title: string
  type: WorkflowStageType
  processes: WorkflowProcess[]
}

export type WorkflowProcessForm = {
  type: 'form'
  form: WorkflowProcessFormOption
}

export type WorkflowProcessConfirmationEmail = {
  type: 'confirmationEmail'
  email: WorkflowProcessConfirmationEmailOption
  isSplitAudience: boolean
}

export type WorkflowProcessConfirmationPage = {
  type: 'confirmationPage'
  page: WorkflowProcessConfirmationPageOption
}

export type WorkflowProcessType = WorkflowProcess['type']

export type WorkflowProcess = WorkflowProcessForm |
WorkflowProcessConfirmationEmail |
WorkflowProcessConfirmationPage

export type WorkflowDiagramNode = NodeModel & {
  id: string
  shape: { type: 'HTML' };
  addInfo: WorkflowStage;
};

export type WorkflowDiagramAddNodeOptions = { position: 'bottom' | 'right', node: WorkflowDiagramNode }

export class CustomDiagramComponent<T extends NodeModel> extends DiagramComponent {
  override historyManager!: CustomHistory<T>

  override nodes: T[]= [];

  override add(obj: T | ConnectorModel, group?: boolean) {
    return super.add(obj, group)
  }

  override addNode(obj: T, group?: boolean | undefined): Node {
    return super.addNode(obj, group)
  }
}

export type CustomHistoryEntry<T extends NodeModel> = {
  object: T,
  prevState: T['addInfo']
}

export type CustomHistory<T extends NodeModel> = History & { push?: (entry: CustomHistoryEntry<T>) => any }
