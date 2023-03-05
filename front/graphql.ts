
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum FrontComponentIdEnum {
    login = "login",
    home = "home"
}

export interface CodeTree {
    childId: number;
    parentId: number;
    child: Code;
    parent: Code;
}

export interface Code {
    id: number;
    name: string;
    childList: CodeTree[];
    parentList: CodeTree[];
}

export interface AuthTree {
    childId: number;
    parentId: number;
    child: Auth;
    parent: Auth;
}

export interface FrontComponentType {
    id: number;
    name: string;
    frontComponentList: FrontComponent[];
}

export interface FrontComponent {
    id: FrontComponentIdEnum;
    value: string;
    initialValue: string;
    frontComponentType: FrontComponentType;
}

export interface Route {
    id: number;
    path: string;
    frontComponent?: Nullable<FrontComponent>;
    children: Route[];
    parent?: Nullable<Route>;
    routesAuthsList: RoutesAuths[];
}

export interface RoutesAuths {
    routeId: number;
    authId: number;
    route: Route;
    auth: Auth;
}

export interface MenuTree {
    child: Menu;
    parent: Menu;
}

export interface Menu {
    id: number;
    name: string;
    childList: MenuTree[];
    parentList: MenuTree[];
    menusByAuthsList: MenusAuths[];
}

export interface MenusAuths {
    menu: Menu;
    auth: Auth;
}

export interface Auth {
    id: number;
    name: string;
    identifier?: Nullable<string>;
    childList: AuthTree[];
    parentList: AuthTree[];
    userList: User[];
    menusByAuthsList: MenusAuths[];
    routesByAuthsList: RoutesAuths[];
}

export interface User {
    id: string;
    auth: Auth;
}

export interface Message {
    id: number;
    msg: string;
    messageGroupId: string;
}

export interface IQuery {
    getAuthList(): Auth[] | Promise<Auth[]>;
    pathList(): Route[] | Promise<Route[]>;
}

type Nullable<T> = T | null;
