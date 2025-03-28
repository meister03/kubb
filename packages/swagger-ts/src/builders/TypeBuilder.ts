/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { nameSorter } from '@kubb/core'
import { ImportsGenerator, OasBuilder } from '@kubb/swagger'
import { createImportDeclaration, print } from '@kubb/ts-codegen'

import { TypeGenerator } from '../generators/TypeGenerator.ts'

import type { PluginContext } from '@kubb/core'
import { combineCodes } from '@kubb/core'
import type { FileResolver, Refs } from '@kubb/swagger'
import type ts from 'typescript'

type Generated = { import: { refs: Refs; name: string }; sources: ts.Node[] }
type Config = {
  resolveName: PluginContext['resolveName']
  fileResolver?: FileResolver
  withJSDocs?: boolean
  withImports?: boolean
  enumType: 'enum' | 'asConst' | 'asPascalConst'
  dateType: 'string' | 'date'
  optionalType: 'questionToken' | 'undefined' | 'questionTokenAndUndefined'
}

// TODO create another function that sort based on the refs(first the ones without refs)
function refsSorter(a: Generated, b: Generated) {
  if (Object.keys(a.import.refs)?.length < Object.keys(b.import.refs)?.length) {
    return -1
  }
  if (Object.keys(a.import.refs)?.length > Object.keys(b.import.refs)?.length) {
    return 1
  }
  return 0
}

export class TypeBuilder extends OasBuilder<Config> {
  configure(config: Config) {
    this.config = config

    if (this.config.fileResolver) {
      this.config.withImports = true
    }

    return this
  }

  print(name?: string): string {
    const codes: string[] = []

    const generated = this.items
      .filter((operationSchema) => (name ? operationSchema.name === name : true))
      .sort(nameSorter)
      .map((operationSchema) => {
        const generator = new TypeGenerator({
          withJSDocs: this.config.withJSDocs,
          resolveName: this.config.resolveName,
          enumType: this.config.enumType,
          dateType: this.config.dateType,
          optionalType: this.config.optionalType,
        })
        const sources = generator.build({ schema: operationSchema.schema, baseName: operationSchema.name, description: operationSchema.description })

        return {
          import: {
            refs: generator.refs,
            name: operationSchema.name,
          },
          sources,
        }
      })
      .sort(refsSorter)

    generated.forEach((item) => {
      codes.push(print(item.sources))
    })

    if (this.config.withImports) {
      const importsGenerator = new ImportsGenerator({ fileResolver: this.config.fileResolver })
      const importMeta = importsGenerator.build(generated.map((item) => item.import))

      if (importMeta) {
        const nodes = importMeta.map((item) => {
          return createImportDeclaration({
            name: [{ propertyName: item.ref.propertyName }],
            path: item.path,
            isTypeOnly: true,
          })
        })

        codes.unshift(print(nodes))
      }
    }

    return combineCodes(codes)
  }
}
