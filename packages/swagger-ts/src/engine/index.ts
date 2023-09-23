/* eslint-disable @typescript-eslint/ban-types */
import type { Prettify, TrimLeft, Comparator, Comparison, Trim, Letter, LineBreak } from '@kubb/core'

type CustomTypes = Record<string, string | number | Record<string, unknown>>

type Keywords = 'type' | 'required'

type IndentingOfString<S extends string, T extends string[] = []> = S extends ` ${infer R}` ? IndentingOfString<R, [...T, string]> : T['length']

type GetKeyValue<TInput extends string = ''> = TInput extends `${infer Key}:${infer Value}` ? { key: Trim<Key>; value: Trim<Value> } : never

type CreateInternalEngine<
  TInput extends string = '',
  Known extends CustomTypes = {},
  Indenting extends number = 0,
> = TInput extends `${infer Key}:${infer Value}${infer Rest}`
  ? Rest extends `${infer Schema}\n${infer RestB}`
    ? Comparator<IndentingOfString<Key>, Indenting> extends Comparison.Equal
      ? Prettify<
          Known & {
            [name in TrimLeft<Key>]: CreateInternalEngine<RestB, { [key in GetKeyValue<Schema>['key']]: GetKeyValue<Schema>['value'] }, IndentingOfString<Key>>
          }
        >
      : Comparator<IndentingOfString<Key>, Indenting> extends Comparison.Greater
      ? Prettify<Known & { [key in GetKeyValue<TInput>['key']]: GetKeyValue<TInput>['value'] }>
      : Comparator<IndentingOfString<Key>, Indenting> extends Comparison.Lower
      ? Prettify<{
          [name in TrimLeft<Key>]: { rest: Schema; prev2: Indenting; indent: IndentingOfString<Key> }
        }>
      : Prettify<Known & { value: Schema }>
    : Known
  : Known

/**
 * Unstable API, not ready for production.
 * Thanks to https://github.com/saltyaom/mobius?tab=readme-ov-file
 * @link https://github.com/saltyaom/mobius
 * @link https://github.com/dotansimha/graphql-typed-ast/blob/master/src/utils.ts
 */
export type CreateEngine<TInput extends string> = CreateInternalEngine<TInput> extends infer Typed
  ? {
      schema: Prettify<TInput>
      $: Prettify<Typed>
    }
  : never

//TODO create a type that can create a YAML syntax to TS/JSON object => easier to work with

export function createEngine<TInput extends string = '', TDefs extends CreateEngine<TInput> = CreateEngine<TInput>>(input: TInput, options: {} = {}): TDefs {
  return {
    schema: input,
  } as TDefs
}

export default createEngine
