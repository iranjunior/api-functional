import type Hasher from 'bcrypt'
import type { MongoClient } from 'mongodb'
import { Logger } from '../config/loggers'

export type AccountModel = {
    name: string;
    age: number;
    email: string;
    occupation: string;
    company: string;
    password: string;
}
export type RAccountModel = AccountModel & {
    _id: string;
}
export interface IAccountOperations {
        create: (data: AccountModel) => Promise<void>;
        loadById: (id: string) => Promise<AccountModel | null>;
        update: (id: string, data: Partial<AccountModel>) => Promise<void>;
        remove: (id: string) => Promise<void>;
}

export interface Account {
    (connectionDatabase: MongoClient, hasher: typeof Hasher, logger: Logger): IAccountOperations
} 

