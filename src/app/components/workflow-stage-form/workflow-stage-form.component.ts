import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { debounceTime } from 'rxjs'
import { WORKFLOW_STAGE_PROCESSES_MAP, WORKFLOW_STAGE_PROPS_MAP } from 'src/app/consts'
import { formWorkflowProcess, formWorkflowStage, GroupType } from 'src/app/helpers'
import {
  WorkflowDiagramAddNodeOptions,
  WorkflowDiagramNode, WorkflowProcessType, WorkflowStage
} from 'src/app/models'

const workflowProcessTypeOptions: WorkflowProcessType[] = ['confirmationEmail', 'confirmationPage', 'form']

const clearStageForm = (form: FormGroup<GroupType<WorkflowStage>>) => {
  form.patchValue({
    title: null
  })
  form.controls.processes.clear()
  form.controls.processes.controls.forEach((_, index) => form.controls.processes.removeAt(index))
}

const setupStageForm = (form: FormGroup<GroupType<WorkflowStage>>) => {
  if (form.value.type) {
    clearStageForm(form)
    WORKFLOW_STAGE_PROCESSES_MAP[form.value.type].forEach(processType =>{
      form.controls.processes.push(formWorkflowProcess(processType))
    })
  }
}

@Component({
  selector: 'app-workflow-stage-form',
  templateUrl: './workflow-stage-form.component.html',
  styleUrls: ['./workflow-stage-form.component.scss'],
})
export class WorkflowStageFormComponent implements OnInit, OnChanges {
  stageForm = formWorkflowStage()
  sequenceTypes = workflowProcessTypeOptions
  isCreatingSequence = false
  stageMap = WORKFLOW_STAGE_PROPS_MAP

  @Input() node?: WorkflowDiagramNode

  @Output() addNode = new EventEmitter<WorkflowDiagramAddNodeOptions>()
  @Output() updateStage = new EventEmitter<(typeof this.stageForm)['value']>()

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.node?.addInfo) {
      this.stageForm.patchValue(this.node?.addInfo, { emitEvent: false })
      this.node?.addInfo.processes.forEach(process => {
        const processForm = formWorkflowProcess(process.type)
        processForm.patchValue( process as any)
        this.stageForm.controls.processes.push(processForm)
      })
    }
    this.stageForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => this.updateStage.emit(value))
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['node'] && this.node) {
    //   this.stageForm.patchValue(omit(this.node?.data, ['sequences']), { emitEvent: false })
    // }
  }

  addProcess(type: WorkflowProcessType) {
    const newControl = formWorkflowProcess(type)
    this.stageForm.controls.processes.push(
      newControl as any
    )
    this.isCreatingSequence = false
  }

  stopPropagation(event: Event, callback: () => any) {
    event.stopPropagation()
    callback()
  }

  toggleCreateSequence(event: Event, isCreating?: boolean) {
    event.stopPropagation()
    this.isCreatingSequence = isCreating == null ? !this.isCreatingSequence : isCreating
  }

  save() {
    this.stageForm.markAsUntouched()
    this.stageForm.markAsPristine()
  }

  clear = clearStageForm
  setup = setupStageForm
}
