import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { WorkflowProcessConfirmationEmail, WorkflowProcessConfirmationPage, WorkflowProcessForm, WorkflowProcessType, WorkflowStage, WorkflowStageType } from './models'

type ArrayControlType<Row> = FormArray<ControlType<Row>>

export type GroupType<Model extends {[key: string]: any}> = {
  [K in keyof Required<Model>]: ControlType<Model[K]>
}

export type ControlType<Model, NullableModel = Model | null> = Model extends any[] ?
  ArrayControlType<Model[number]> :
  Model extends {[key: string]: unknown} ?
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    FormGroup<GroupType<Model>> :
    FormControl<NullableModel>

 export const formWorkflowProcessForm = () => new FormGroup<GroupType<WorkflowProcessForm>>({
  type: new FormControl<WorkflowProcessForm['type']>('form'),
  form: new FormControl<WorkflowProcessForm['form'] | null>(null)
})

export const formWorkflowProcessConfirmationEmail = () => new FormGroup<GroupType<WorkflowProcessConfirmationEmail>>({
  type: new FormControl<WorkflowProcessConfirmationEmail['type']>('confirmationEmail'),
  email: new FormControl<WorkflowProcessConfirmationEmail['email'] | null>(null),
  isSplitAudience: new FormControl(false)
})

export const formWorkflowProcessConfirmationPage = () => new FormGroup<GroupType<WorkflowProcessConfirmationPage>>({
  type: new FormControl<WorkflowProcessConfirmationPage['type']>('confirmationPage'),
  page: new FormControl<WorkflowProcessConfirmationPage['page'] | null>(null)
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

export const formWorkflowStage = () => new FormGroup<GroupType<WorkflowStage>>({
  title: new FormControl<string | null>(null),
  processes: new FormArray<any>([]),
  type: new FormControl<WorkflowStageType| null>(null)
})

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const _ = { ...obj }
  keys.forEach((key) => delete _[key])
  return _
}
