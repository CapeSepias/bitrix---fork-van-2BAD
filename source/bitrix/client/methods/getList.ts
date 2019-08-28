import { GotInstance, GotJSONFn } from 'got'
import { ListableMethod, ListPayload } from '../../types'

export const handleGetListPayload = <P>(payload: ListPayload<P>) => {
  // tslint:disable-next-line no-if-statement
  if (payload.error) {
  // tslint:disable-next-line no-throw
    throw new Error(
      `[get] failed to get the resource: ${payload.error}.`
    )
  }

  return payload
}

// @todo `getList` is temporary workaround. Bitrix will return different signature
//       depending on `get` and `list` methods. Until we can automatically
//       map those types based on methods and thus infer output types, we need this helper
export default ({ get }: GotInstance<GotJSONFn>) =>
  <P>(method: ListableMethod, query?: object | string): Promise<ListPayload<P>> =>
    get(method, { query })
      .then(({ body }) => handleGetListPayload(body as ListPayload<P>))
