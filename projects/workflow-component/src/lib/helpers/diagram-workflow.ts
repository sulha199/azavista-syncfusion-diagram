import { EventWorkflowTemplateType, IEventWorkflow } from '@azavista/servicelib'
import { ConnectorModel } from '@syncfusion/ej2-angular-diagrams'
import { WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT, WORKFLOW_DIAGRAM_NODE_DEFAULT } from '../consts'
import { WorkflowCollection, WorkflowDiagramNode } from '../models'

const gap = 350
const padding = 100

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
    topRoots.map(({ id }) => id).filter((id) => id !== undefined) as string[]
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

function appendNodeIdPrefix(nodeId: string, prefix = 'wf_node_'): string {
  return nodeId ? `${prefix}${nodeId}` : nodeId
}

function getTopLevelRootOfWorkflows(workflowsItems: IEventWorkflow[]) {
  return workflowsItems.filter(({ input_pins }) => input_pins.length === 0)
}

function getSecondLevelRootOfWorkflows(
  workflowsItems: IEventWorkflow[],
  topLevelRootIds: string[]
) {
  return workflowsItems.filter(({ id }) => {
    const isFirstLevelRoot = topLevelRootIds.includes(id ?? '')
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
  const hasNoNextWorkflow =
    startingNode.type === EventWorkflowTemplateType.cancellation ||
    !startingNode.settings.next_workflow_ids?.next_workflow
  if (hasNoNextWorkflow) {
    return [startingNode]
  }
  const nextWorflow = workflowsItems.find(
    ({ id }) => id === startingNode.settings.next_workflow_ids?.next_workflow
  )
  if (nextWorflow == undefined) {
    return [startingNode]
  }
  return [startingNode, ...getNextWorkflowSequences(nextWorflow, workflowsItems)]
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
    ...getConnectorsFromNode(
      node,
      {
        ...options,
        style: {
          ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT.style,
          ...options?.style,
          strokeDashArray: '2 4',
          opacity: 0.2,
        },
        sourceDecorator: {
          ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT.sourceDecorator,
          style: {
            opacity: 0.2
          }
        },
        targetDecorator: {
          ...WORKFLOW_DIAGRAM_CONNECTOR_DEFAULT.targetDecorator,
          style: {
            opacity: 0.2
          }
        },
        type: 'Bezier',
      },
      getNextWorkflowByOutputProp
    ),
  ]
  const nextWorkflowItemsBySetting = getNextWorkflowBySettingsProp(node).map(nodeId => workflowsItems.find(({id}) => nodeId === id)).filter(item => item);
  return connectorsFromCurrentNode.concat(
    ...nextWorkflowItemsBySetting.map(nextWorkflow => getMergedConnectorsFromNode(nextWorkflow, workflowsItems)),
  )
}

const getConnectorsFromNode = (
  node: IEventWorkflow,
  options?: Partial<ConnectorModel>,
  nextWorkflowGetter: (node: IEventWorkflow) => string[] = getNextWorkflowBySettingsProp
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

const getNextWorkflowBySettingsProp = (node: IEventWorkflow) => {
  if (node.type === EventWorkflowTemplateType.cancellation) {
    return []
  }
  const nextWorflow = node.settings.next_workflow_ids?.next_workflow
  return nextWorflow ? [nextWorflow] : []
}

const getNextWorkflowByOutputProp = (node: IEventWorkflow) => {
  return node.output_pins
}
