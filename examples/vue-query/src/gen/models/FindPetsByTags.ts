import type { Pet } from './Pet'

/**
 * @description Invalid tag value
 */
export type FindPetsByTags400 = any | null

export type FindPetsByTagsQueryParams = {
  /**
   * @description Tags to filter by
   * @type array | undefined
   */
  tags?: string[]
}

/**
 * @description successful operation
 */
export type FindPetsByTagsQueryResponse = Pet[]
