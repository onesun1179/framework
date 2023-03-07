
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export type FrontComponentId = "login" | "home";

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

export interface FrontComponentType {
    id: number;
    name: string;
    frontComponentList: FrontComponent[];
}

export interface FrontComponent {
    id: FrontComponentId;
    value: string;
    initialValue: string;
    frontComponentType: FrontComponentType;
    routeList: Route[];
}

export interface Route {
    id: number;
    path: string;
    frontComponent?: Nullable<FrontComponent>;
    children?: Nullable<Route[]>;
    parent?: Nullable<Route>;
}

export interface FullRoute {
    id: number;
    route: Route;
    fullRoutesAuths: FullRoutesAuths[];
}

export interface FullRoutesAuths {
    fullRouteId: number;
    authId: number;
    fullRoute: FullRoute;
    auth: Auth;
}

export interface MenuTree {
    child: Menu;
    parent: Menu;
}

export interface IconGroupTree {
    childId: number;
    parentId: number;
    child: IconGroup;
    parent: IconGroup;
}

export interface IconGroup {
    id: number;
    name: string;
    iconList: Icon[];
    childList: IconGroupTree[];
    parentList: IconGroupTree[];
}

export interface Icon {
    name: string;
    filePath: string;
    iconGroup: IconGroup;
    menuList: Menu[];
}

export interface Menu {
    id: number;
    name: string;
    childList: MenuTree[];
    parentList: MenuTree[];
    menusAuths: MenusAuths[];
    icon: Icon;
}

export interface MenusAuths {
    menu: Menu;
    auth: Auth;
}

export interface AuthGroup {
    id: number;
    name: string;
    authList: Auth[];
    children: AuthGroup[];
    parent: AuthGroup;
}

export interface Auth {
    id: number;
    name: string;
    identifier?: Nullable<string>;
    authGroup: AuthGroup;
    userList: User[];
    menusAuths: MenusAuths[];
    fullRoutesAuths: FullRoutesAuths[];
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
    route(id: number): Route | Promise<Route>;
    routes(id?: Nullable<number>): Route[] | Promise<Route[]>;
}

type Nullable<T> = T | null;
