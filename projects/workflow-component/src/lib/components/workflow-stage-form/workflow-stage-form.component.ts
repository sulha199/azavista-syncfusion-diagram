import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WORKFLOW_STAGE_PROCESSES_MAP, WORKFLOW_STAGE_PROPS_MAP } from 'projects/workflow-component/src/lib/consts'
import { formWorkflowProcess, formWorkflowStage, GroupType } from 'projects/workflow-component/src/lib/helpers'
import { debounceTime } from 'rxjs'
import { WorkflowDiagramAddNodeOptions, WorkflowDiagramNode, WorkflowProcessType, WorkflowStage } from '../../models'


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
  selector: 'azavista-workflow-stage-form',
  templateUrl: './workflow-stage-form.component.html',
  styleUrls: ['./workflow-stage-form.component.scss'],
})
export class WorkflowStageFormComponent implements OnInit, AfterViewInit {
  stageForm?: ReturnType< typeof formWorkflowStage>
  sequenceTypes = workflowProcessTypeOptions
  isCreatingSequence = false
  stageMap = WORKFLOW_STAGE_PROPS_MAP

  @Input() node?: WorkflowDiagramNode

  @Output() addNode = new EventEmitter<WorkflowDiagramAddNodeOptions>()
  @Output() updateStage = new EventEmitter<(typeof this.stageForm)['value']>()
  @Output() updateHeight = new EventEmitter<number>()

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (this.node?.addInfo) {
      this.stageForm = formWorkflowStage(this.node?.addInfo?.type)
      this.stageForm.patchValue(this.node?.addInfo, { emitEvent: false })
      this.node?.addInfo.processes.forEach(process => {
        const processForm = formWorkflowProcess(process.type)
        processForm.patchValue( process as any)
        this.stageForm.controls.processes.push(processForm)
      })
    }
    this.stageForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.updateStage.emit(value)
      this.emitUpdateHeight()
    })
  }

  ngAfterViewInit(): void {
    this.emitUpdateHeight();
  }

  addProcess(type: WorkflowProcessType) {
    const newControl = formWorkflowProcess(type)
    this.stageForm.controls.processes.push(
      newControl
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

  emitUpdateHeight() {
    const height = this.host.nativeElement.getBoundingClientRect().height
    this.updateHeight.emit(Math.round(height))
  }

  clear = clearStageForm
  setup = setupStageForm
}
