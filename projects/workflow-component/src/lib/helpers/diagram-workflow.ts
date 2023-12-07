/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventWorkflowTemplateType, IEventWorkflow } from '@azavista/servicelib'
import { ConnectorModel } from '@syncfusion/ej2-angular-diagrams'
import {
  WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT,
  WORKFLOW_DIAGRAM_NODE_DEFAULT,
} from '../consts'
import { WorkflowCollection, WorkflowDiagramNode } from '../models'

const gap = 350
const padding = 300

/******
 *
 *
 *
 *
 */

const workflowTypeOrder = [
  EventWorkflowTemplateType.invitation,
  EventWorkflowTemplateType.registrationWaitingList,
  EventWorkflowTemplateType.registration,
  EventWorkflowTemplateType.publicRegistration,
  EventWorkflowTemplateType.multiRegistration,
  EventWorkflowTemplateType.profile,
  EventWorkflowTemplateType.paymentWaitingList,
  EventWorkflowTemplateType.payment,
  EventWorkflowTemplateType.preArrival,
  EventWorkflowTemplateType.arrival,
  EventWorkflowTemplateType.cancellation,
  EventWorkflowTemplateType.eventCancellation,
  EventWorkflowTemplateType.stageAction,
]

type MapByWorkflowId<ContentType> = {
  [workflowId: string]: ContentType
}
type WorkflowId = string
type WorkflowTree = { [workflowId: string]: WorkflowTree[] | null }
/**
 * @ [0] -> contains members of top root
 * @ [1] -> contains children of top root
 * @ [2] -> contains grand-children of top root
 */
type WorkflowItemByLevel = Array<Array<WorkflowId>>

const workflowGrid = (workflows: IEventWorkflow[]) => {
  const { rootWorkflows, workflowByType, targetMapByWorkflowId, sourceMapByWorkflowId, orphansWorkflows } = getWorkflowsMaps(workflows)
  const gridX: {[x: number]: WorkflowId[]} = {}
  const gridY: {[y: number]: WorkflowId[]} = {}
  const workflowNodesMap: {[workflowId: WorkflowId]: WorkflowDiagramNode} = {};

  type GetSequencesOptions = {
    x?: number,
    y?: number
  }
  const getSequences = (workflow: IEventWorkflow, options?: GetSequencesOptions) => {
    // const current
  }
}

const generateWorkflowTree = (workflows: IEventWorkflow[]) => {
  // setup sources & target map
  const { rootWorkflows, workflowByType, targetMapByWorkflowId, sourceMapByWorkflowId, orphansWorkflows } = getWorkflowsMaps(workflows)
  // If no `rootWorkflows` found, then decide the root workflows based on `workflowTypeOrder`
  if (rootWorkflows.length === 0) {
    const rootWorkflowType = workflowTypeOrder.find((type) => workflowByType[type])
    rootWorkflows.push(...workflowByType[rootWorkflowType])
  }

  const getWorkflowLevel = (
    workflowIds: WorkflowId[],
    prevLevels?: WorkflowItemByLevel
  ) => {
    const levels: WorkflowItemByLevel = [...prevLevels, [...workflowIds]]
    const nextLevelWorkflowIds = workflowIds
      .reduce(
        (sum: string[], workflowId) => [...sum, ...targetMapByWorkflowId[workflowId]],
        []
      )
      .filter((nextLevelWorkflowId) =>
        prevLevels?.some((level) => !level.includes(nextLevelWorkflowId))
      )
    const result: WorkflowItemByLevel = nextLevelWorkflowIds.length > 0
      ? (getWorkflowLevel(nextLevelWorkflowIds, levels) as WorkflowItemByLevel)
      : levels
    return result
  }

  const levels = rootWorkflows.map(rootWorkflow => getWorkflowLevel([rootWorkflow.id]));
  return {
    targetMapByWorkflowId,
    sourceMapByWorkflowId,
    levels,
    workflowByType,
    rootWorkflows,
    orphansWorkflows
  }
}

export const workflowDataToDiagramNode = (workflowsItems: IEventWorkflow[]) => {
  const topRoots = getTopLevelRootOfWorkflows(workflowsItems)
  const collectionFromTopRoots = mergeWorkflowCollection(
    topRoots.map((item, index) =>
      makeSequenceFromRootNode(item, workflowsItems, {
        node: { offsetY: gap * index + padding },
      })
    )
  )

  const secondLevelRoots = getSecondLevelRootOfWorkflows(
    workflowsItems,
    collectionFromTopRoots.nodes
      .map(({ id }) => id)
      .filter((id) => id !== undefined) as string[]
  )
  const collectionFromSecondLevelRoots = mergeWorkflowCollection(
    secondLevelRoots.map((item, index) =>
      makeSequenceFromRootNode(item, workflowsItems, {
        node: { offsetY: gap * (topRoots.length + index) + padding },
      })
    )
  )
  const combined = mergeWorkflowCollection([
    collectionFromTopRoots,
    collectionFromSecondLevelRoots,
  ])
  return {
    nodes: putNodesPrefixId(removeDuplicatedNodes(combined.nodes)),
    connectors: combined.connectors,
    // connectors: collectionFromTopRoots.connectors,
  } as WorkflowCollection
}

const putNodesPrefixId = (nodes: WorkflowDiagramNode[], prefix = 'wf_node_') =>
  nodes.map((node) => ({
    ...node,
    id: appendNodeIdPrefix(node.id, prefix),
  }))

const removeDuplicatedNodes = (nodes: WorkflowDiagramNode[]) => {
  type NodeMap = {
    [nodeId: string]: WorkflowDiagramNode
  }
  const map = nodes.reduce((map, node) => {
    return map[node.id] ? map : { ...map, [node.id]: node }
  }, {} as NodeMap)
  return Object.values(map)
}

const mergeWorkflowCollection = (collection: WorkflowCollection[]) =>
  collection.reduce(
    (result, { connectors, nodes }) => {
      return {
        nodes: result.nodes.concat(nodes),
        connectors: result.connectors.concat(connectors),
      }
    },
    { nodes: [], connectors: [] } as WorkflowCollection
  )

type WokrflowFunctionOptions = {
  node?: Partial<WorkflowDiagramNode>
  connector?: Partial<ConnectorModel>
}

const makeSequenceFromRootNode = (
  rootNode: IEventWorkflow,
  workflowsItems: IEventWorkflow[],
  options?: WokrflowFunctionOptions
) => {
  const connectors = getMergedConnectorsFromNode(
    rootNode,
    workflowsItems,
    options?.connector
  )
  const nodes = getNextWorkflowSequences(rootNode, workflowsItems).map((node, index) =>
    getNodeFromWorkflowItem(node, { ...options?.node, offsetX: gap * index + padding })
  )
  return { connectors, nodes } as WorkflowCollection
}

export const getNodeFromWorkflowItem = (
  source: IEventWorkflow,
  options?: Partial<WorkflowDiagramNode>
) => {
  return {
    ...WORKFLOW_DIAGRAM_NODE_DEFAULT,
    ...options,
    id: source.id,
    addInfo: {
      title: source.name,
      type: source.type,
      settings: source.settings,
      processes: [],
    },
  } as WorkflowDiagramNode
}

const getWorkflowsMaps = (workflows: IEventWorkflow[]) => {
  const targetMapByWorkflowId: MapByWorkflowId<string[]> = {}
  const sourceMapByWorkflowId: MapByWorkflowId<string[]> = {}
  const workflowByType: {
    [type in EventWorkflowTemplateType]?: IEventWorkflow[]
  } = {}
  workflows.forEach((workflow) => {
    const targetWorkflows = getNextWorkflowIdsBySettingsProp(workflow)
    targetMapByWorkflowId[workflow.id] = targetWorkflows
    targetWorkflows.forEach(
      (target) => (sourceMapByWorkflowId[target] = [...sourceMapByWorkflowId[target], workflow.id])
    )
    workflowByType[workflow.type] = [...workflowByType[workflow.type], workflow]
  })

  const orphansWorkflows: IEventWorkflow[] = []
  const rootWorkflows: IEventWorkflow[] = []
  workflows.forEach((workflow) => {
    const { id } = workflow
    if (!sourceMapByWorkflowId[id]) {
      if (targetMapByWorkflowId[id]) {
        rootWorkflows.push(workflow)
      } else {
        orphansWorkflows.push(workflow)
      }
    }
  })
  return { rootWorkflows, workflowByType, targetMapByWorkflowId, sourceMapByWorkflowId, orphansWorkflows }
}

function appendNodeIdPrefix(nodeId: string, prefix = 'wf_node_'): string {
  return nodeId ? `${prefix}${nodeId}` : nodeId
}

function getTopLevelRootOfWorkflows(workflowsItems: IEventWorkflow[]) {
  return workflowsItems.filter(({ input_pins }) => input_pins.length === 0)
}

function getSecondLevelRootOfWorkflows(
  workflowsItems: IEventWorkflow[],
  skippedWorkflowIds: string[]
) {
  return workflowsItems.filter(({ id }) => {
    const isFirstLevelRoot = skippedWorkflowIds.includes(id ?? '')
    if (isFirstLevelRoot) {
      return false
    }
    const isBeingNextWorkflow = workflowsItems.some((item) => {
      return (
        item.type !== EventWorkflowTemplateType.cancellation &&
        item.settings.next_workflow_ids?.next_workflow === id
      )
    })
    if (isBeingNextWorkflow) {
      return false
    }
    return true
  })
}

function getNextWorkflowSequences(
  startingNode: IEventWorkflow,
  workflowsItems: IEventWorkflow[]
): IEventWorkflow[] {
  const nextWorflows = getNextWorkflowIdsBySettingsProp(startingNode)
    .map((workflowId) => workflowsItems.find(({ id }) => id === workflowId))
    .filter((item) => !!item) as IEventWorkflow[]
  const combinedNextWorkflows = nextWorflows
    .map((nextWorkflow) => getNextWorkflowSequences(nextWorkflow, workflowsItems))
    .reduce((merged, current) => merged.concat(current), [])
  return [startingNode, ...combinedNextWorkflows]
}

function getMergedConnectorsFromNode(
  node: IEventWorkflow | undefined,
  workflowsItems: IEventWorkflow[],
  options?: Partial<ConnectorModel>
): ConnectorModel[] {
  if (node === undefined) {
    return []
  }
  const connectorsFromCurrentNode = [
    ...getConnectorsFromNode(node, options),
    // ...getConnectorsFromNode(
    //   node,
    //   {
    //     ...options,
    //     style: {
    //       ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT.style,
    //       ...options?.style,
    //       strokeDashArray: '2 4',
    //       opacity: 0.2,
    //     },
    //     sourceDecorator: {
    //       ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT.sourceDecorator,
    //       style: {
    //         opacity: 0.2,
    //       },
    //     },
    //     targetDecorator: {
    //       ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT.targetDecorator,
    //       style: {
    //         opacity: 0.2,
    //       },
    //     },
    //     type: 'Bezier',
    //   },
    //   getNextWorkflowByOutputProp
    // ),
  ]
  const nextWorkflowIdsBySetting = getNextWorkflowIdsBySettingsProp(node).filter(
    (id) => id !== undefined
  )
  const nextWorkflowItemsBySetting = nextWorkflowIdsBySetting
    .map((nodeId) => workflowsItems.find(({ id }) => nodeId === id))
    .filter((item) => item)
  return connectorsFromCurrentNode.concat(
    ...nextWorkflowItemsBySetting.map((nextWorkflow) =>
      getMergedConnectorsFromNode(nextWorkflow, workflowsItems)
    )
  )
}

const getConnectorsFromNode = (
  node: IEventWorkflow,
  options?: Partial<ConnectorModel>,
  nextWorkflowGetter: (
    node: IEventWorkflow
  ) => string[] = getNextWorkflowIdsBySettingsProp
) => {
  return nextWorkflowGetter(node).map((nodeId) => {
    return {
      ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT,
      ...options,
      sourceID: appendNodeIdPrefix(node.id!),
      targetID: appendNodeIdPrefix(nodeId),
    } as ConnectorModel
  })
}

type EventWorkflowWithType<WorkflowType extends EventWorkflowTemplateType> = {
  type: WorkflowType
} & IEventWorkflow

const getNextWorkflowIdsBySettingsProp = <WorkflowType extends EventWorkflowTemplateType>(
  workflow: EventWorkflowWithType<WorkflowType>
) => {
  const getterMap = nextWorkflowsFieldsGetters[workflow.type]
  return Object.entries(getterMap)
    .map(([_, getter]) => {
      const a = getterMap[_]
      return getter(workflow) as string
    })
    .filter((workflowId) => workflowId != undefined)
}

const getNextWorkflowByOutputProp = (node: IEventWorkflow) => {
  return node.output_pins
}

type NextWorkflowFieldMap = {
  [WorkflowType in EventWorkflowTemplateType]: (keyof EventWorkflowWithType<WorkflowType>['settings'])[]
}

const nextWorkflowBasic = {
  'next-workflow': (workflow: IEventWorkflow) =>
    workflow.type !== EventWorkflowTemplateType.cancellation
      ? workflow.settings.next_workflow_ids?.next_workflow
      : undefined,
}

const nextWorkflowsFieldsGetters: {
  [WorkflowType in EventWorkflowTemplateType]: {
    [name: string]: (node: EventWorkflowWithType<WorkflowType>) => string | undefined
  }
} = {
  [EventWorkflowTemplateType.arrival]: nextWorkflowBasic,
  [EventWorkflowTemplateType.cancellation]: {
    'register-workflow': ({ settings }) => settings.register_workflow_id,
  },
  [EventWorkflowTemplateType.eventCancellation]: nextWorkflowBasic,
  [EventWorkflowTemplateType.invitation]: nextWorkflowBasic,
  [EventWorkflowTemplateType.multiRegistration]: {
    ...nextWorkflowBasic,
    'decline-workflow': ({ settings }) => settings.decline_workflow_id,
  },
  [EventWorkflowTemplateType.payment]: {
    ...nextWorkflowBasic,
    'decline-workflow': ({ settings }) => settings.decline_workflow_id,
    'cancellation-workflow': ({ settings }) => settings.cancellation_workflow_id,
  },
  [EventWorkflowTemplateType.paymentWaitingList]: {
    ...nextWorkflowBasic,
    'decline-workflow': ({ settings }) => settings.decline_workflow_id,
    'cancellation-workflow': ({ settings }) => settings.cancellation_workflow_id,
  },
  [EventWorkflowTemplateType.preArrival]: {
    ...nextWorkflowBasic,
    'cancellation-workflow': ({ settings }) => settings.cancellation_workflow_id,
  },
  [EventWorkflowTemplateType.profile]: nextWorkflowBasic,

  [EventWorkflowTemplateType.publicRegistration]: {
    ...nextWorkflowBasic,
    'decline-workflow': ({ settings }) => settings.decline_workflow_id,
    'cancellation-workflow': ({ settings }) => settings.cancellation_workflow_id,
  },

  [EventWorkflowTemplateType.registration]: {
    ...nextWorkflowBasic,
    'decline-workflow': ({ settings }) => settings.decline_workflow_id,
    'cancellation-workflow': ({ settings }) => settings.cancellation_workflow_id,
  },
  [EventWorkflowTemplateType.registrationWaitingList]: {
    ...nextWorkflowBasic,
    'decline-workflow': ({ settings }) => settings.decline_workflow_id,
    'cancellation-workflow': ({ settings }) => settings.cancellation_workflow_id,
  },
  [EventWorkflowTemplateType.stageAction]: nextWorkflowBasic,
}
