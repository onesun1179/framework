
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface InsertRoleRequest {
    name: string;
    roleGroupSeqNo?: Nullable<number>;
    userIds?: Nullable<string>;
    menuSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface SaveRoleGroupRequest {
    name: string;
    parentSeqNo?: Nullable<number>;
    seqNo?: Nullable<number>;
    roleSeqNos?: Nullable<number[]>;
    childSeqNos?: Nullable<number[]>;
}

export interface InsertRouteRequest {
    path: string;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    childSeqNos?: Nullable<number[]>;
    roleSeqNos?: Nullable<number[]>;
}

export interface UpdateRouteRequest {
    seqNo: number;
    parentSeqNo?: Nullable<number>;
    path?: Nullable<string>;
    frontComponentId?: Nullable<string>;
    childSeqNos?: Nullable<number[]>;
    roleSeqNos?: Nullable<number[]>;
}

export interface UpdateMessageRequest {
    seqNo: number;
    text?: Nullable<string>;
    messageGroupCode?: Nullable<string>;
}

export interface InsertMessageRequest {
    text: string;
    messageGroupCode: string;
}

export interface UpdateMessageGroupRequest {
    seqNo: string;
    name: string;
    messageSeqNos?: Nullable<number[]>;
}

export interface InsertMessageGroupRequest {
    name: string;
    messageSeqNos?: Nullable<number[]>;
}

export interface InsertFrontComponentRequest {
    id: string;
    frontComponentTypeSeqNo: number;
    initialFrontComponentId: string;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface UpdateFrontComponentRequest {
    id: string;
    frontComponentTypeSeqNo?: Nullable<number>;
    initialFrontComponentId?: Nullable<string>;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface InsertFrontComponentTypeRequest {
    name: string;
    frontComponentIds?: Nullable<string[]>;
}

export interface UpdateFrontComponentTypeRequest {
    seqNo: number;
    name?: Nullable<string>;
    frontComponentIds?: Nullable<string[]>;
}

export interface InsertAllFrontComponentRequest {
    id: string;
    frontComponentId?: Nullable<string>;
}

export interface UpdateAllFrontComponentRequest {
    id: string;
    frontComponentId?: Nullable<string>;
}

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

export interface RoleGroup {
    seqNo: number;
    name: string;
    parentSeqNo?: Nullable<number>;
    roles: Role[];
    children: RoleGroup[];
    parent?: Nullable<RoleGroup>;
}

export interface FrontComponentType {
    seqNo: number;
    name: string;
    frontComponents: FrontComponent[];
}

export interface RoleFrontComponentMap {
    roleSeqNo: number;
    frontComponentId: string;
    role: Role;
    frontComponent: FrontComponent;
    allFrontComponent: AllFrontComponent;
}

export interface AllFrontComponent {
    id: string;
    frontComponentId?: Nullable<string>;
    frontComponent: FrontComponent;
}

export interface FrontComponent {
    id: string;
    frontComponentTypeSeqNo: number;
    initialFrontComponentId: string;
    allFrontComponentByCurrentUser?: Nullable<AllFrontComponent>;
    frontComponentType: FrontComponentType;
    allFrontComponents: AllFrontComponent[];
    initialFrontComponent: AllFrontComponent;
    roles: Role[];
    routes: Route[];
}

export interface MenuRoleMap {
    seqNo: number;
    menuSeqNo: number;
    roleSeqNo: number;
    menu: Menu;
    role: Role;
    orderNo: number;
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
    children: IconGroupTree[];
    parents: IconGroupTree[];
}

export interface Icon {
    seqNo: number;
    name: string;
    filePath: string;
    menus: Menu[];
}

export interface Menu {
    seqNo: number;
    name: string;
    iconSeqNo?: Nullable<number>;
    roles: Role[];
    icon?: Nullable<Icon>;
    children: Menu[];
    route?: Nullable<Route>;
}

export interface Route {
    seqNo: number;
    path: string;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    frontComponent?: Nullable<FrontComponent>;
    children: Route[];
    parent: Route;
    roles: Role[];
    routeTree: RouteTree;
}

export interface Role {
    seqNo: number;
    name: string;
    identifier?: Nullable<string>;
    roleGroupSeqNo?: Nullable<number>;
    roleGroup: RoleGroup;
    users: User[];
    menus: Menu[];
    routes: Route[];
    frontComponents: FrontComponent[];
}

export interface User {
    id: string;
    roleSeqNo: number;
    role: Role;
}

export interface RouteTree {
    fullPath: string;
    depth: number;
}

export interface MessageGroup {
    seqNo: string;
    name: string;
    messages: Message[];
}

export interface Message {
    seqNo: number;
    text: string;
    messageGroupCode: string;
    messageGroup: MessageGroup;
}

export interface AppMetadata {
    name: string;
    value: string;
}

export interface IQuery {
    authCheck(): boolean | Promise<boolean>;
    user(id: string): User | Promise<User>;
    role(seqNo: number): Nullable<RoleGroup> | Promise<Nullable<RoleGroup>>;
    roleFrontComponentMap(roleSeqNo: number, frontComponentId: string): Nullable<RoleFrontComponentMap> | Promise<Nullable<RoleFrontComponentMap>>;
    message(seqNo: number): Message | Promise<Message>;
    rootMenus(): Menu[] | Promise<Menu[]>;
    route(seqNo: number): Route | Promise<Route>;
    routes(rootYn: boolean): Route[] | Promise<Route[]>;
    messageGroup(code: string): MessageGroup | Promise<MessageGroup>;
    appMetaData(name: string): AppMetadata | Promise<AppMetadata>;
    frontComponent(id: string): Nullable<FrontComponent> | Promise<Nullable<FrontComponent>>;
    frontComponentType(seqNo: number): Nullable<FrontComponent> | Promise<Nullable<FrontComponent>>;
    allFrontComponent(id: string): Nullable<AllFrontComponent> | Promise<Nullable<AllFrontComponent>>;
    allFrontComponentByCurrentUserAndFrontComponentId(frontComponentId: string): Nullable<AllFrontComponent> | Promise<Nullable<AllFrontComponent>>;
    icon(seqNo: number): Icon | Promise<Icon>;
}

export interface IMutation {
    insertRole(role: InsertRoleRequest): Nullable<Role> | Promise<Nullable<Role>>;
    saveRoleGroup(SaveRoleGroupRequest: SaveRoleGroupRequest): RoleGroup | Promise<RoleGroup>;
    removeRoleGroup(seqNo: number): RoleGroup | Promise<RoleGroup>;
    insertRoute(insertRouteRequest: InsertRouteRequest): Route | Promise<Route>;
    updateRoute(updateRouteRequest: UpdateRouteRequest): Route | Promise<Route>;
    updateMessage(UpdateMessageRequest: UpdateMessageRequest): Message | Promise<Message>;
    insertMessage(InsertMessageRequest: InsertMessageRequest): Message | Promise<Message>;
    updateMessageGroup(UpdateMessageGroupRequest: UpdateMessageGroupRequest): MessageGroup | Promise<MessageGroup>;
    insertMessageGroup(InsertMessageGroupRequest: InsertMessageGroupRequest): MessageGroup | Promise<MessageGroup>;
    insertFrontComponent(insertFrontComponentRequest: InsertFrontComponentRequest): FrontComponent | Promise<FrontComponent>;
    updateFrontComponent(updateFrontComponentRequest: UpdateFrontComponentRequest): FrontComponent | Promise<FrontComponent>;
    insertFrontComponentType(insertFrontComponentTypeRequest: InsertFrontComponentTypeRequest): FrontComponentType | Promise<FrontComponentType>;
    updateFrontComponentType(updateFrontComponentTypeRequest: UpdateFrontComponentTypeRequest): FrontComponentType | Promise<FrontComponentType>;
    insertAllFrontComponent(insertAllFrontComponentRequest: InsertAllFrontComponentRequest): AllFrontComponent | Promise<AllFrontComponent>;
    updateAllFrontComponent(updateAllFrontComponentRequest: UpdateAllFrontComponentRequest): AllFrontComponent | Promise<AllFrontComponent>;
}

type Nullable<T> = T | null;
