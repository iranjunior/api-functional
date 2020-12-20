/* eslint-disable @typescript-eslint/no-unused-vars */
import hansher from 'bcrypt'
import { MongoClient } from 'mongodb'
import { Logger } from '../src/config/loggers'

declare module 'express' {
    interface Application {
        locals: {
            database: MongoClient;
            hasher: typeof hansher;
            logger: Logger; 
        }
    }
  }
  