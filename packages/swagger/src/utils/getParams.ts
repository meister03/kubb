import { createFunctionParams } from '@kubb/core'

import type { OperationSchema } from '../types.ts'
import { isParameterObject } from './isParameterObject'

export function getDataParams(
  operationSchema: OperationSchema | undefined,
  { typed }: { typed: boolean } = { typed: false },
): Parameters<typeof createFunctionParams>[0] {
  if (!operationSchema || !operationSchema.schema.properties || !operationSchema.name) {
    return []
  }
  return Object.entries(operationSchema.schema.properties).map(([name, schema]) => {
    const isParam = isParameterObject(schema)
    return { name, required: isParam ? schema.required : undefined, type: typed ? `${operationSchema.name}["${name}"]` : undefined }
  })
}

export function getParams(operationSchema: OperationSchema | undefined, { typed }: { typed: boolean } = { typed: false }): string {
  const data = getDataParams(operationSchema, { typed })

  if (!data?.length) {
    return ''
  }

  return createFunctionParams(data)
}
