import { faker } from '@faker-js/faker'

import { Order } from '../models/ts/Order'

export function createOrder(): Order {
  return {
    id: faker.number.float({}),
    petId: faker.number.float({}),
    quantity: faker.number.float({}),
    shipDate: faker.date.anytime(),
    status: faker.helpers.arrayElement<any>([`placed`, `approved`, `delivered`]),
    http_status: faker.helpers.arrayElement<any>([`ok`, `not_found`]),
    complete: faker.datatype.boolean(),
  }
}
