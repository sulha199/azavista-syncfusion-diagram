import { WorkflowProcessType, WorkflowStageType } from './models'

/* margin in px */
export const WORKFLOW_DIAGRAM_NODE_MARGIN = 50;

export const WORKFLOW_STAGE_PROCESSES_MAP: Record<WorkflowStageType, WorkflowProcessType[]> = {
  'invitation': ['confirmationEmail'],
  'registration': ['form', 'confirmationPage', 'confirmationEmail'],
  'post-registration': ['confirmationPage', 'confirmationEmail'],
  'arrival': ['form','confirmationPage', 'confirmationEmail'],
  'cancellation': ['confirmationEmail'],
  'decline': ['confirmationEmail']
}

type WorkflowStageProp = {
  label: string,
  description: string
}

export const WORKFLOW_STAGE_PROPS_MAP: Record<WorkflowStageType, WorkflowStageProp> = {
  'invitation': {
    label: 'Invitation',
    description: 'An invitation block is used to start the event process by inviting the audience.  '
  },
  'registration': {
    label: 'Registration',
    description: 'An invitation block is used to start the event process by inviting the audience.  '
  },
  'post-registration': {
    label: 'Registered Participants',
    description: 'An invitation block is used to start the event process by inviting the audience.  '
  },
  'arrival': {
    label: 'Arrival',
    description: 'An invitation block is used to start the event process by inviting the audience.  '
  },
  'cancellation': {
    label: 'Cancellation',
    description: 'An invitation block is used to start the event process by inviting the audience.  '
  },
  'decline': {
    label: 'Decline',
    description: 'An invitation block is used to start the event process by inviting the audience.  '
  }
}
