
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CodeTree {
    childSeqNo: number;
    parentSeqNo: number;
    child: Code;
    parent: Code;
}

export interface Code {
    seqNo: number;
    name: string;
    children: CodeTree[];
    parents: CodeTree[];
}

export interface FrontComponentType {
    seqNo: number;
    name: string;
    frontComponents: FrontComponent[];
}

export interface FrontComponent {
    seqNo: number;
    name: string;
    frontComponentTypeSeqNo: number;
    frontComponentType: FrontComponentType;
    routes: Route[];
}

export interface Route {
    seqNo: number;
    path: string;
    frontComponentSeqNo?: Nullable<number>;
    frontComponent?: Nullable<FrontComponent>;
    children: Route[];
    parents: Route[];
    leafYn: boolean;
}

export interface IconGroupTree {
    childSeqNo: number;
    parentSeqNo: number;
    child: IconGroup;
    parent: IconGroup;
}

export interface IconGroup {
    seqNo: number;
    name: string;
    icons: Icon[];
    children: IconGroupTree[];
    parents: IconGroupTree[];
}

export interface Icon {
    id: string;
    filePath: string;
    iconGroupSeqNo: number;
    iconGroup: IconGroup;
    menus: Menu[];
}

export interface Menu {
    seqNo: number;
    name: string;
    children: Menu[];
    parents: Menu[];
    auths: Auth[];
    iconId: string;
    icon: Icon;
}

export interface AuthGroup {
    seqNo: number;
    name: string;
    auths: Auth[];
    children: AuthGroup[];
    parent: AuthGroup;
}

export interface Auth {
    seqNo: number;
    name: string;
    identifier?: Nullable<string>;
    authGroupSeqNo: number;
    authGroup: AuthGroup;
    users: User[];
    menus: Menu[];
    routes: Route[];
}

export interface User {
    id: string;
    authSeqNo: number;
    auth: Auth;
}

export interface AppMetadata {
    name: string;
    value: string;
}

export interface MessageGroup {
    code: string;
    name: string;
    messages: Message[];
}

export interface Message {
    seqNo: number;
    msg: string;
    messageGroupCode: string;
    messageGroup: MessageGroup;
}

export interface IQuery {
    auth(seqNo: number): Nullable<Auth> | Promise<Nullable<Auth>>;
    route(seqNo: number): Route | Promise<Route>;
    rootRoutes(): Route[] | Promise<Route[]>;
    message(seqNo: number): Message | Promise<Message>;
    appMetaData(name: string): AppMetadata | Promise<AppMetadata>;
}

type Nullable<T> = T | null;
