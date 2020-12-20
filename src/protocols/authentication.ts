import type { MongoClient } from 'mongodb'
import { Logger } from '../config/loggers'

export type AuthenticationInformations = {
    token: string;
    tokenType: string;
    expireIn: number;
}
type AuthCredentiais = {
    email: string;
    password: string;
}
export interface IAuthenticationOperations {
    login: (authCredentiais: AuthCredentiais) => Promise<AuthenticationInformations | null>;
}

export interface Authentication {
    (connectionDatabase: MongoClient, logger: Logger): IAuthenticationOperations
}