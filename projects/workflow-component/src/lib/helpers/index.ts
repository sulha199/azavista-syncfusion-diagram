export * from './diagram-workflow'
export * from './form'
export * from './form-workflow-settings'


export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const _ = { ...obj }
  keys.forEach((key) => delete _[key])
  return _
}

