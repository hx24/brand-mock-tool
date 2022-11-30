const prefix = 'mockTool:'

interface A {
  [T: string]: string
}

const addPrefix = (target: A): A => {
  const result: any = {}
  for (const key in target) {
    result[key] = prefix + target[key]
  }
  return result
}

export const listenEvents = addPrefix({
  START_SELECTING: 'start',
  STOP_SELECTING: 'stop',
  UPDATE_MODULE: 'update'
})

export const sendEvents = addPrefix({
  SELECTED: 'selected',
})