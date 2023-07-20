import { Request } from 'express'
import { Params } from 'express-serve-static-core'
export const makeMockRequest = ({params, query}: {params?: Params, query?: Params}): Request => {
    const req = {
        params: params || {},
        query: query || {}
    } as unknown

    return req as Request
}