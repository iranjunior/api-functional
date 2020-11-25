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
}

export interface Account {
    (connectionDatabase: MongoClient): IAccountOperations
} 

