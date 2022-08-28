/* eslint-disable no-unused-vars */
import { Response } from "express";

enum StatusCode {
    SUCCESS = '10000',
    FAILURE = '10001',
    RETRY = '10002',
    INVALID_ACCESS_TOKEN = '10003'
}

enum ResponseStatus{
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNET_ERROR = 500,
}

abstract class ApiResponse{
    // eslint-disable-next-line no-useless-constructor
    constructor(
        protected statusCode: StatusCode,
        protected status: ResponseStatus,
        protected message: string
    ){}

    protected prepare<T extends ApiResponse>(res:Response,response:T):Response{
        return res.status(this.status).json(ApiResponse.customize(response))
    }

    private static customize<T extends ApiResponse>(response: T): T {
        const clone: T = {} as T
        Object.assign(clone, response)
        // @ts-ignore
        delete clone.status
        // eslint-disable-next-line no-restricted-syntax
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i]
        return clone
      }

    public send(res:Response):Response{
        return this.prepare<ApiResponse>(res,this)
    }
}
