import { createFunctionParams } from './createFunctionParams.ts'

describe('objectToParameters', () => {
  test('if object is resolved to a string with parameters', () => {
    expect(createFunctionParams([{ name: 'firstName' }])).toEqual('firstName')
    expect(createFunctionParams([{ name: 'firstName' }, { name: 'lastName' }])).toEqual('firstName, lastName')
  })

  test('if object is resolved to a string with typed parameters', () => {
    expect(createFunctionParams([{ name: 'firstName', type: 'User["firstName"]' }])).toEqual('firstName: User["firstName"]')
    expect(
      createFunctionParams([
        { name: 'firstName', type: 'User["firstName"]' },
        { name: 'lastName', type: 'User["lastName"]' },
      ]),
    ).toEqual('firstName: User["firstName"], lastName: User["lastName"]')
  })

  test('if object is resolved to a string with typed parameters and optional paramters', () => {
    expect(
      createFunctionParams([
        { name: 'firstName', type: 'User["firstName"]', required: false },
        { name: 'lastName', type: 'User["lastName"]' },
      ]),
    ).toEqual('lastName: User["lastName"], firstName?: User["firstName"]')
    expect(
      createFunctionParams([
        { name: 'firstName', type: 'User["firstName"]', required: false },
        { name: 'lastName', type: 'User["lastName"]', required: false },
      ]),
    ).toEqual('firstName?: User["firstName"], lastName?: User["lastName"]')

    expect(
      createFunctionParams([
        { name: 'firstName', type: 'User["firstName"]', default: '{}' },
        { name: 'lastName', type: 'User["lastName"]', required: false },
      ]),
    ).toEqual('lastName?: User["lastName"], firstName: User["firstName"] = {}')
  })
})
