import type { QueryKey, UseQueryReturnType, UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import client from '@kubb/swagger-client/client'
import type { FindPetsByStatusQueryResponse, FindPetsByStatusQueryParams, FindPetsByStatus400 } from '../models/FindPetsByStatus'

export const findPetsByStatusQueryKey = (params?: FindPetsByStatusQueryParams) => [`/pet/findByStatus`, ...(params ? [params] : [])] as const

export function findPetsByStatusQueryOptions<TData = FindPetsByStatusQueryResponse, TError = FindPetsByStatus400>(
  params?: FindPetsByStatusQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
  const queryKey = findPetsByStatusQueryKey(params)

  return {
    queryKey,
    queryFn: () => {
      return client<TData, TError>({
        method: 'get',
        url: `/pet/findByStatus`,
        params,

        ...options,
      })
    },
  }
}

/**
 * @description Multiple status values can be provided with comma separated strings
 * @summary Finds Pets by status
 * @link /pet/findByStatus
 */

export function useFindPetsByStatus<TData = FindPetsByStatusQueryResponse, TError = FindPetsByStatus400>(
  params?: FindPetsByStatusQueryParams,
  options: {
    query?: UseQueryOptions<TData, TError>
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>
  } = {},
): UseQueryReturnType<TData, TError> & { queryKey: QueryKey } {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPetsByStatusQueryKey(params)

  const query = useQuery<TData, TError>({
    ...findPetsByStatusQueryOptions<TData, TError>(params, clientOptions),
    ...queryOptions,
  }) as UseQueryReturnType<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryKey as QueryKey

  return query
}
