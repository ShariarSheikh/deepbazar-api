import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan, { StreamOptions } from 'morgan'
import { corsUrls, environment } from './config'
import Logger from './core/Logger'

// morgan logger--------------------------------------------------
// morgan logger--------------------------------------------------
const stream:StreamOptions = {
    write: 
    message => Logger.http(message)
}

const skip =()=>{
    return environment !== "development"
}

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream,
    skip,
  })


//
export default [
    helmet(),
    morganMiddleware,
    cors({origin:corsUrls}),
    express.json(),
    express.urlencoded({extended:true})
]