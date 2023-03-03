import { EventWorkflowTemplateType, IEventWorkflow } from '@azavista/servicelib'
import { ConnectorModel } from '@syncfusion/ej2-angular-diagrams'
import {
  WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT,
  WORKFLOW_DIAGRAM_NODE_DEFAULT
} from './consts'
import { WorkflowDiagramNode } from './models'

export const nodesDummy: WorkflowDiagramNode[] = [
  {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    id: 'node1_templatex',
    offsetX: 160,
    offsetY: 250,
    addInfo: {
      type: EventWorkflowTemplateType.invitation,
      settings: {} as any,
      title: 'Invitation',
      processes: [],
    },
  },
  {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    id: 'node1_template2',
    offsetX: 480,
    offsetY: 170,
    addInfo: {
      type: EventWorkflowTemplateType.registration,
      settings: {} as any,
      title: 'Registration',
      processes: [],
    },
  },
  {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    id: 'node1_template3',
    offsetX: 790,
    offsetY: 180,
    addInfo: {
      type: EventWorkflowTemplateType.preArrival,
      title: 'Registered Participants',
      settings: {} as any,
      processes: [],
    },
  },
  {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    id: 'node1_template4',
    offsetX: 1090,
    offsetY: 280,
    addInfo: {
      type: EventWorkflowTemplateType.arrival,
      settings: {} as any,
      title: 'arrival',
      processes: [],
    },
  },
]

export const nodesConnectorDummy: ConnectorModel[] = nodesDummy
  .slice(1)
  .map((target, index) => {
    const source = nodesDummy[index]
    return {
      ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT,
      sourceID: source.id,
      targetID: target.id,
    }
  })

export const mockWorkflows: IEventWorkflow[] = [
  {
    id: '62f2f2a321803ba3c0a42f7b',
    name: 'Registration',
    type: EventWorkflowTemplateType.registration,
    settings: {
      registration_completed_stage_name: 'Registered - new',
      registration_pending_stage_name: 'Registered - in progress',
      form_ids: ['6286aefb59a63e001205ed29'],
      thank_you_page_id: '6286aeff59a63e001205ed56',
      next_workflow_ids: {
        next_workflow: '6286af0bdab81800130dded7',
      },
    },
    stage_map: {
      registration_pending: '62f2f2a3af54bdb15b0fd397',
      registration_completed: '62f2f2a3af54bdb15b0fd399',
    },
    process_map: {
      registration_confirmation: '62f2f2a3af54bdb15b0fd39d',
      next_workflow: '62f2f2b3af54bdb15b0fd424',
    },
    custom_process_map: {
      registration_engagement_sequence: '62f2f2a4af54bdb15b0fd3a1',
      after_registration_actions: '62f2f2a4af54bdb15b0fd3a3',
    },
    created_at: '2022-08-09T23:49:55.308Z',
    updated_at: '2022-12-26T06:21:04.051Z',
    input_pins: ['6286af0adab81800130ddec9'],
    output_pins: ['6286af0bdab81800130dded7', '638f4078b5b1e6bc402fbb36'],
    cancellation_pins: ['6286af0bdab81800130ddede', '6286af0bdab81800130ddee5'],
  },
  {
    id: '6286af0bdab81800130dded7',
    name: 'Pre-arrival',
    type: EventWorkflowTemplateType.preArrival,
    settings: {
      stage_name: 'Registered',
      form_ids: ['6286aefd59a63e001205ed34'],
      thank_you_page_id: '6286aeff59a63e001205ed61',
      email_campaign_id: '6286af072a6c56cb8774857a',
      cancellation_workflow_id: '6286af0bdab81800130ddee5',
      next_workflow_ids: {
        next_workflow: '638f4078b5b1e6bc402fbb36',
      },
    },
    stage_map: {
      pre_arrival: '6286af0bbfff4c450ee1cb2e',
    },
    process_map: {
      pre_arrival_update_confirmation: '6286af0bbfff4c648ce1cb31',
    },
    custom_process_map: {
      pre_arrival_engagement_sequence: '6286af0bbfff4cce50e1cb35',
    },
    created_at: '2022-05-19T20:56:43.385Z',
    updated_at: '2022-12-26T06:21:05.101Z',
    input_pins: ['62f2f2a321803ba3c0a42f7b', '6286af0adab81800130ddec9'],
    output_pins: ['638f4078b5b1e6bc402fbb36'],
    cancellation_pins: ['6286af0bdab81800130ddede', '6286af0bdab81800130ddee5'],
  },
  {
    id: '638f4078b5b1e6bc402fbb36',
    name: 'Arrival',
    type: EventWorkflowTemplateType.arrival,
    settings: {
      continue_after_seconds: 0,
      stage_name: 'Arrived',
    } as any,
    stage_map: {
      arrival: '638f40785ec6a1e3667bb751',
    },
    process_map: {
      arrival: '638f40795ec6a1e3667bb754',
    },
    custom_process_map: {
      arrival_engagement_sequence: '638f40795ec6a1e3667bb757',
    },
    created_at: '2022-12-06T13:15:36.833Z',
    updated_at: '2022-12-26T06:21:06.501Z',
    input_pins: [
      '62f2f2a321803ba3c0a42f7b',
      '6286af0bdab81800130dded7',
      '6286af0adab81800130ddec9',
    ],
    output_pins: [],
    cancellation_pins: ['6286af0bdab81800130ddede', '6286af0bdab81800130ddee5'],
  },
  {
    id: '6286af0bdab81800130ddede',
    name: 'Decline',
    type: EventWorkflowTemplateType.cancellation,
    settings: {
      cancelled_stage_name: 'Declined',
      cancelled_with_reason_stage_name: 'Declined - with reason',
      form_ids: ['6286aefd59a63e001205ed3f'],
      thank_you_page_id: '6286af0059a63e001205ed6c',
      email_campaign_id: '6286af082a6c56cb8774857e',
      register_workflow_id: '6286af0bdab81800130dded0',
      count_as: ''
    },
    stage_map: {
      cancelled: '6286af0bbfff4ce57de1cb39',
      cancellation_reason_given: '6286af0bbfff4c72e5e1cb3b',
    },
    process_map: {
      cancellation_confirmation: '6286af0bbfff4c4da9e1cb3f',
      order_refund: '6286af0bbfff4cc9c2e1cb43',
    },
    custom_process_map: {
      cancellation_initiated_sequence: '6286af0bbfff4c1edce1cb46',
      cancellation_finalized_sequence: '6286af0bbfff4c2414e1cb48',
    },
    created_at: '2022-05-19T20:56:43.573Z',
    updated_at: '2022-12-26T06:21:07.600Z',
    input_pins: [
      '62f2f2a321803ba3c0a42f7b',
      '6286af0bdab81800130dded7',
      '638f4078b5b1e6bc402fbb36',
      '6286af0adab81800130ddec9',
    ],
    output_pins: [
      '62f2f2a321803ba3c0a42f7b',
      '6286af0bdab81800130dded7',
      '638f4078b5b1e6bc402fbb36',
    ],
    cancellation_pins: [],
  },
  {
    id: '6286af0bdab81800130ddee5',
    name: 'Cancellation by Participant',
    type: EventWorkflowTemplateType.cancellation,
    settings: {
      cancelled_stage_name: 'Cancelled',
      cancelled_with_reason_stage_name: 'Cancelled - with Reason',
      form_ids: ['6286aefe59a63e001205ed4a'],
      thank_you_page_id: '6286af0059a63e001205ed78',
      email_campaign_id: '6286af0a2a6c56cb87748582',
      register_workflow_id: '6286af0bdab81800130dded0',
      count_as: ''
    },
    stage_map: {
      cancelled: '6286af0bbfff4c50b5e1cb4c',
      cancellation_reason_given: '6286af0bbfff4c7d31e1cb4e',
    },
    process_map: {
      cancellation_confirmation: '6286af0bbfff4c2514e1cb52',
      order_refund: '6286af0bbfff4c73a0e1cb56',
    },
    custom_process_map: {
      cancellation_initiated_sequence: '6286af0bbfff4ca185e1cb59',
      cancellation_finalized_sequence: '6286af0cbfff4c6323e1cb5b',
    },
    created_at: '2022-05-19T20:56:43.686Z',
    updated_at: '2022-12-26T06:21:08.439Z',
    input_pins: [
      '62f2f2a321803ba3c0a42f7b',
      '6286af0bdab81800130dded7',
      '638f4078b5b1e6bc402fbb36',
      '6286af0adab81800130ddec9',
    ],
    output_pins: [
      '62f2f2a321803ba3c0a42f7b',
      '6286af0bdab81800130dded7',
      '638f4078b5b1e6bc402fbb36',
    ],
    cancellation_pins: [],
  },
  {
    id: '6286af0adab81800130ddec9',
    name: 'Invitation',
    type: EventWorkflowTemplateType.invitation,
    settings: {
      stage_name: 'Invitation sent',
      email_template_id: '6286af0359a63e001205edbd',
    },
    stage_map: {
      invited: '6286af0bbfff4c9003e1cb15',
    },
    process_map: {
      invitation_email_sent: '6286af0bbfff4c4dc6e1cb18',
    },
    custom_process_map: {
      after_invitation_actions: '6286af0bbfff4cda9de1cb1b',
    },
    created_at: '2022-05-19T20:56:42.942Z',
    updated_at: '2022-12-26T06:21:08.841Z',
    input_pins: [],
    output_pins: [
      '62f2f2a321803ba3c0a42f7b',
      '6286af0bdab81800130dded7',
      '638f4078b5b1e6bc402fbb36',
    ],
    cancellation_pins: ['6286af0bdab81800130ddede', '6286af0bdab81800130ddee5'],
  },
]
