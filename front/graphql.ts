
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Path {
    id: number;
    title?: Nullable<string>;
    pathname: string;
    componentPath?: Nullable<string>;
    children: Path[];
}

export interface Auth {
    id: number;
    name: string;
    identifier?: Nullable<string>;
    children: Auth[];
}

export interface IQuery {
    getAuthList(): Auth[] | Promise<Auth[]>;
    pathList(): Path[] | Promise<Path[]>;
}

type Nullable<T> = T | null;
