import client from '../../../client'
import type {
  UploadFileMutationRequest,
  UploadFileMutationResponse,
  UploadFilePathParams,
  UploadfileQueryparams,
} from '../../../models/ts/petController/UploadFile'

/**
 * @summary uploads an image
 * @link /pet/:petId/uploadImage
 */

export function uploadFile<TData = UploadFileMutationResponse, TVariables = UploadFileMutationRequest>(
  petId: UploadFilePathParams['petId'],
  data?: TVariables,
  params?: UploadfileQueryparams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<TData> {
  return client<TData, TVariables>({
    method: 'post',
    url: `/pet/${petId}/uploadImage`,
    params,
    data,

    ...options,
  })
}
