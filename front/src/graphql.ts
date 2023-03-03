
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Path {
    id: number;
    title: string;
    path: string;
    componentPath?: Nullable<string>;
    children: Path[];
}

export class Auth {
    id: number;
    name: string;
    identifier?: Nullable<string>;
    children: Auth[];
}

export abstract class IQuery {
    abstract getAuthList(): Auth[] | Promise<Auth[]>;

    abstract pathList(): Path[] | Promise<Path[]>;
}

type Nullable<T> = T | null;
