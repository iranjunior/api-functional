import {  MongoClient } from 'mongodb'

export type AccountModel = {
    name: string;
    age: number;
    occupation: string;
    company: string;
}
export interface IAccountOperations {
        create: (data: AccountModel) => Promise<void>;
        loadById: (id: string) => Promise<AccountModel | null>;
        update: (id: string, data: Partial<AccountModel>) => Promise<void>;
        remove: (id: string) => Promise<void>;
}

export interface Account {
    (connectionDatabase: MongoClient): IAccountOperations
} 

