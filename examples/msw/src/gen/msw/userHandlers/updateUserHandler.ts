import { rest } from 'msw'
import { createUpdateUserMutationResponse, createUpdateUserMutationRequest } from '../../mocks/userMocks/createUpdateUser'

export const updateUserHandler = rest.put('*/user/:username', function handler(req, res, ctx) {
  return res(ctx.json(createUpdateUserMutationResponse()))
})
