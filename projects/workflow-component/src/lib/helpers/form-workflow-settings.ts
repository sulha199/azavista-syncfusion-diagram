import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { EventWorkflowTemplateType, INextWorkflow } from '@azavista/servicelib'
import { WorkflowStage } from '../models'
import { ControlType, GroupType } from './form'

type WorkflowWithType<T extends EventWorkflowTemplateType> = WorkflowStage & { type: T }

export const formWorkflowArrival = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.arrival>>>({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.arrival | null>(
      EventWorkflowTemplateType.arrival
    ),
    settings: new FormGroup<
      GroupType<WorkflowWithType<EventWorkflowTemplateType.arrival>['settings']>
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      continue_after_seconds: new FormControl(),
      continue_with_workflow: new FormControl(),
      email_campaign_id: new FormControl(),
      form_ids: new FormArray<ControlType<string>>([]),
      page_ids: new FormArray<ControlType<string>>([]),
      stage_name: new FormControl(),
      thank_you_page_id: new FormControl(),
    }),
  })

export const formWorkflowCancellation = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.cancellation>>>({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl(EventWorkflowTemplateType.cancellation),
    settings: new FormGroup<
      GroupType<WorkflowWithType<EventWorkflowTemplateType.cancellation>['settings']>
    >({
      cancelled_stage_name: new FormControl(),
      cancelled_with_reason_stage_name: new FormControl(),
      form_ids: new FormArray<ControlType<string>>([]),
      email_campaign_id: new FormControl(),
      register_workflow_id: new FormControl(),
      count_as: new FormControl(),
      thank_you_page_id: new FormControl(),
    }),
  })

export const formWorkflowEventCancellation = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.eventCancellation>>>(
    {
      title: new FormControl<string | null>(null),
      processes: new FormArray<any>([]),
      type: new FormControl<EventWorkflowTemplateType.eventCancellation | null>(
        EventWorkflowTemplateType.eventCancellation
      ),
      settings: new FormGroup<
        GroupType<
          WorkflowWithType<EventWorkflowTemplateType.eventCancellation>['settings']
        >
      >({
        next_workflow_ids: nextWorflowIdsForm(),
        email_campaign_id: new FormControl(),
        stage_name: new FormControl(),
      }),
    }
  )

export const formWorkflowInvitation = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.invitation>>>({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.invitation | null>(
      EventWorkflowTemplateType.invitation
    ),
    settings: new FormGroup<
      GroupType<WorkflowWithType<EventWorkflowTemplateType.invitation>['settings']>
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      email_template_id: new FormControl(),
      stage_name: new FormControl(),
    }),
  })

export const formWorkflowMultiRegistration = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.multiRegistration>>>(
    {
      title: new FormControl<string | null>(null),
      processes: new FormArray<any>([]),
      type: new FormControl<EventWorkflowTemplateType.multiRegistration | null>(
        EventWorkflowTemplateType.multiRegistration
      ),
      settings: new FormGroup<
        GroupType<
          WorkflowWithType<EventWorkflowTemplateType.multiRegistration>['settings']
        >
      >({
        next_workflow_ids: nextWorflowIdsForm(),
        confirmation_email_campaign_id: new FormControl(),
        decline_workflow_id: new FormControl(),
        form_id: new FormControl(),
        invitation_email_campaign_id: new FormControl(),
        multi_registration_confirmation_stage_name: new FormControl(),
        multi_registration_invitation_stage_name: new FormControl(),
        thank_you_page_id: new FormControl(),
      }),
    }
  )

export const formWorkflowPayment = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.payment>>>({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.payment | null>(
      EventWorkflowTemplateType.payment
    ),
    settings: new FormGroup<
      GroupType<WorkflowWithType<EventWorkflowTemplateType.payment>['settings']>
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      email_campaign_id: new FormControl(),
      page_ids: new FormArray<ControlType<string>>([]),
      thank_you_page_id: new FormControl(),
      form_id: new FormControl(),
      decline_workflow_id: new FormControl(),
      failed_page_id: new FormControl(),
      order_completed_stage_name: new FormControl(),
      order_in_progress_stage_name: new FormControl(),
      cancellation_workflow_id: new FormControl(),
    }),
  })

export const formWorkflowPaymentWaitingList = () =>
  new FormGroup<
    GroupType<WorkflowWithType<EventWorkflowTemplateType.paymentWaitingList>>
  >({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.paymentWaitingList | null>(
      EventWorkflowTemplateType.paymentWaitingList
    ),
    settings: new FormGroup<
      GroupType<
        WorkflowWithType<EventWorkflowTemplateType.paymentWaitingList>['settings']
      >
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      email_campaign_id: new FormControl(),
      page_ids: new FormArray<ControlType<string>>([]),
      thank_you_page_id: new FormControl(),
      form_id: new FormControl(),
      decline_workflow_id: new FormControl(),
      failed_page_id: new FormControl(),
      order_completed_stage_name: new FormControl(),
      number_of_participants: new FormControl(),
      order_pending_stage_name: new FormControl(),
      reserved_promotion_time: new FormControl(),
      reserved_registration_time: new FormControl(),
      use_waiting_list: new FormControl(),
      waitinglist_email_campaign_id: new FormControl(),
      waitinglist_promotion_email_campaign_id: new FormControl(),
      waitinglist_stage_name: new FormControl(),
      waitinglist_thank_you_page_id: new FormControl(),
      cancellation_workflow_id: new FormControl(),
    }),
  })

export const formWorkflowPreArrival = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.preArrival>>>({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.preArrival | null>(
      EventWorkflowTemplateType.preArrival
    ),
    settings: new FormGroup<
      GroupType<WorkflowWithType<EventWorkflowTemplateType.preArrival>['settings']>
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      email_campaign_id: new FormControl(),
      form_ids: new FormArray<ControlType<string>>([]),
      page_ids: new FormArray<ControlType<string>>([]),
      stage_name: new FormControl(),
      thank_you_page_id: new FormControl(),
      cancellation_workflow_id: new FormControl(),
    }),
  })

export const formWorkflowProfile = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.profile>>>({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.profile | null>(
      EventWorkflowTemplateType.profile
    ),
    settings: new FormGroup<
      GroupType<WorkflowWithType<EventWorkflowTemplateType.profile>['settings']>
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      profile_page_ids: pageIdsForm(),
      register_after: new FormControl(),
    }),
  })

export const formWorkflowPublicRegistration = () =>
  new FormGroup<
    GroupType<WorkflowWithType<EventWorkflowTemplateType.publicRegistration>>
  >({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.publicRegistration | null>(
      EventWorkflowTemplateType.publicRegistration
    ),
    settings: new FormGroup<
      GroupType<
        WorkflowWithType<EventWorkflowTemplateType.publicRegistration>['settings']
      >
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      cancellation_workflow_id: new FormControl(),
      page_ids: pageIdsForm(),
      decline_workflow_id: new FormControl(),
      email_campaign_id: new FormControl(),
      form_ids: formIdsForm(),
      registration_completed_stage_name: new FormControl(),
      registration_pending_stage_name: new FormControl(),
      thank_you_page_id: new FormControl(),
    }),
  })

export const formWorkflowRegistration = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.registration>>>({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.registration | null>(
      EventWorkflowTemplateType.registration
    ),
    settings: new FormGroup<
      GroupType<WorkflowWithType<EventWorkflowTemplateType.registration>['settings']>
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      cancellation_workflow_id: new FormControl(),
      page_ids: pageIdsForm(),
      decline_workflow_id: new FormControl(),
      email_campaign_id: new FormControl(),
      form_ids: formIdsForm(),
      registration_completed_stage_name: new FormControl(),
      registration_pending_stage_name: new FormControl(),
      thank_you_page_id: new FormControl(),
    }),
  })

export const formWorkflowPublicRegistrationWaitingList = () =>
  new FormGroup<
    GroupType<WorkflowWithType<EventWorkflowTemplateType.registrationWaitingList>>
  >({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.registrationWaitingList | null>(
      EventWorkflowTemplateType.registrationWaitingList
    ),
    settings: new FormGroup<
      GroupType<
        WorkflowWithType<EventWorkflowTemplateType.registrationWaitingList>['settings']
      >
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      email_campaign_id: new FormControl(),
      page_ids: new FormArray<ControlType<string>>([]),
      thank_you_page_id: new FormControl(),
      decline_workflow_id: new FormControl(),
      number_of_participants: new FormControl(),
      reserved_promotion_time: new FormControl(),
      reserved_registration_time: new FormControl(),
      use_waiting_list: new FormControl(),
      waitinglist_email_campaign_id: new FormControl(),
      waitinglist_promotion_email_campaign_id: new FormControl(),
      waitinglist_stage_name: new FormControl(),
      waitinglist_thank_you_page_id: new FormControl(),
      cancellation_workflow_id: new FormControl(),
      form_ids: formIdsForm(),
      registration_completed_stage_name: new FormControl(),
      registration_pending_stage_name: new FormControl(),
    }),
  })

export const formWorkflowStageAction = () =>
  new FormGroup<GroupType<WorkflowWithType<EventWorkflowTemplateType.stageAction>>>({
    title: new FormControl<string | null>(null),
    processes: new FormArray<any>([]),
    type: new FormControl<EventWorkflowTemplateType.stageAction | null>(
      EventWorkflowTemplateType.stageAction
    ),
    settings: new FormGroup<
      GroupType<WorkflowWithType<EventWorkflowTemplateType.stageAction>['settings']>
    >({
      next_workflow_ids: nextWorflowIdsForm(),
      email_campaign_id: new FormControl(),
      count_as: new FormControl(),
      disable_manual_stage_change: new FormControl(),
      stage_name: new FormControl(),
    }),
  })

export const nextWorflowIdsForm = () =>
  new FormGroup<GroupType<INextWorkflow>>({
    next_workflow: new FormControl(),
  })

export const pageIdsForm = () => {
  return new FormArray<ControlType<string>>([])
}

export const formIdsForm = () => {
  return new FormArray<ControlType<string>>([])
}

export const formWorkflowSettings: {[Type in EventWorkflowTemplateType]: () => ControlType<WorkflowWithType<Type>>} = {
  [EventWorkflowTemplateType.arrival]: formWorkflowArrival,
  [EventWorkflowTemplateType.cancellation]: formWorkflowCancellation,
  [EventWorkflowTemplateType.eventCancellation]: formWorkflowEventCancellation,
  [EventWorkflowTemplateType.invitation]: formWorkflowInvitation,
  [EventWorkflowTemplateType.multiRegistration]: formWorkflowMultiRegistration,
  [EventWorkflowTemplateType.payment]: formWorkflowPayment,
  [EventWorkflowTemplateType.paymentWaitingList]: formWorkflowPaymentWaitingList,
  [EventWorkflowTemplateType.preArrival]: formWorkflowPreArrival,
  [EventWorkflowTemplateType.profile]: formWorkflowProfile,
  [EventWorkflowTemplateType.publicRegistration]: formWorkflowPublicRegistration,
  [EventWorkflowTemplateType.registration]: formWorkflowRegistration,
  [EventWorkflowTemplateType.registrationWaitingList]: formWorkflowPublicRegistrationWaitingList,
  [EventWorkflowTemplateType.stageAction]: formWorkflowStageAction
}
