/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { EventWorkflowTemplateType } from '@azavista/servicelib'
import {
  WorkflowProcessConfirmationEmail,
  WorkflowProcessConfirmationPage,
  WorkflowProcessForm,
  WorkflowProcessType
} from '../models'
import { formWorkflowSettings } from './form-workflow-settings'

type ArrayControlType<Row> = FormArray<ControlType<Row>>

export type GroupType<Model extends { [key: string]: any }> = {
  [K in keyof Required<Model>]: ControlType<Model[K]>
}

export type ControlType<Model, NullableModel = Model | null> = Model extends any[]
  ? ArrayControlType<Model[number]>
  : Model extends { [key: string]: any }
  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    FormGroup<GroupType<Model>>
  : FormControl<NullableModel>

export const formWorkflowProcessForm = () =>
  new FormGroup<GroupType<WorkflowProcessForm>>({
    type: new FormControl<WorkflowProcessForm['type']>('form'),
    form: new FormControl<WorkflowProcessForm['form'] | null>(null),
  })

export const formWorkflowProcessConfirmationEmail = () =>
  new FormGroup<GroupType<WorkflowProcessConfirmationEmail>>({
    type: new FormControl<WorkflowProcessConfirmationEmail['type']>('confirmationEmail'),
    email: new FormControl<WorkflowProcessConfirmationEmail['email'] | null>(null),
    isSplitAudience: new FormControl(false),
  })

export const formWorkflowProcessConfirmationPage = () =>
  new FormGroup<GroupType<WorkflowProcessConfirmationPage>>({
    type: new FormControl<WorkflowProcessConfirmationPage['type']>('confirmationPage'),
    page: new FormControl<WorkflowProcessConfirmationPage['page'] | null>(null),
  })

export const formWorkflowProcess = (type: WorkflowProcessType) => {
  switch (type) {
    case 'confirmationEmail':
      return formWorkflowProcessConfirmationEmail()
    case 'confirmationPage':
      return formWorkflowProcessConfirmationPage()
    case 'form':
      return formWorkflowProcessForm()
  }
}

export const formWorkflowStage = <Type extends EventWorkflowTemplateType>(type: Type) => {
  const form = formWorkflowSettings[type]();
  (form as any).addControl('title', new FormControl<string| null>(null))
  return form
}



