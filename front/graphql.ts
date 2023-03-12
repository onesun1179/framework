
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface InsertRoleIn {
    name: string;
    roleGroupSeqNo: number;
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
    frontComponentId?: Nullable<number>;
    childSeqNos?: Nullable<number[]>;
    parentSeqNos?: Nullable<number[]>;
    roleSeqNos?: Nullable<number[]>;
}

export interface UpdateRouteRequest {
    seqNo: number;
    path?: Nullable<string>;
    frontComponentId?: Nullable<number>;
    childSeqNos?: Nullable<number[]>;
    parentSeqNos?: Nullable<number[]>;
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
    frontComponentId: string;
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

export interface AllFrontComponent {
    id: string;
    frontComponentId: string;
    frontComponent: FrontComponent;
}

export interface RoleFrontComponentMap {
    roleSeqNo: number;
    frontComponentId: number;
    role: Role;
    frontComponent: FrontComponent;
    allFrontComponent: AllFrontComponent;
}

export interface FrontComponent {
    id: string;
    frontComponentTypeSeqNo: number;
    initialFrontComponentId: string;
    frontComponentType: FrontComponentType;
    allFrontComponents: AllFrontComponent[];
    initialFrontComponent: AllFrontComponent;
    roles: Role[];
    routes: Route[];
}

export interface Route {
    seqNo: number;
    path: string;
    frontComponentId?: Nullable<number>;
    frontComponent?: Nullable<FrontComponent>;
    children: Route[];
    parents: Route[];
    roles: Role[];
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
    menus?: Nullable<Menu[]>;
}

export interface Menu {
    seqNo: number;
    name: string;
    children: Menu[];
    parents: Menu[];
    roles: Role[];
    iconId?: Nullable<string>;
    icon?: Nullable<Icon>;
}

export interface Role {
    seqNo: number;
    name: string;
    roleGroupSeqNo: number;
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
    user(id: string): User | Promise<User>;
    role(seqNo: number): Nullable<RoleGroup> | Promise<Nullable<RoleGroup>>;
    roleFrontComponentMap(roleSeqNo: number, frontComponentId: string): Nullable<RoleFrontComponentMap> | Promise<Nullable<RoleFrontComponentMap>>;
    message(seqNo: number): Message | Promise<Message>;
    route(seqNo: number): Route | Promise<Route>;
    rootRoutes(): Route[] | Promise<Route[]>;
    messageGroup(code: string): MessageGroup | Promise<MessageGroup>;
    appMetaData(name: string): AppMetadata | Promise<AppMetadata>;
    frontComponent(id: string): Nullable<FrontComponent> | Promise<Nullable<FrontComponent>>;
    frontComponentType(seqNo: number): Nullable<FrontComponent> | Promise<Nullable<FrontComponent>>;
    allFrontComponent(id: string): Nullable<AllFrontComponent> | Promise<Nullable<AllFrontComponent>>;
    icon(id: string): Icon | Promise<Icon>;
}

export interface IMutation {
    insertRole(role: InsertRoleIn): Nullable<Role> | Promise<Nullable<Role>>;
    saveRoleGroup(SaveRoleGroupRequest: SaveRoleGroupRequest): RoleGroup | Promise<RoleGroup>;
    removeRoleGroup(seqNo: number): RoleGroup | Promise<RoleGroup>;
    insertRoute(insertRouteRequest: InsertRouteRequest): Route | Promise<Route>;
    updateRoute(updateRouteRequest: UpdateRouteRequest): Route | Promise<Route>;
    updateMessage(UpdateMessageRequest: UpdateMessageRequest): Message | Promise<Message>;
    insertMessage(InsertMessageRequest: InsertMessageRequest): Message | Promise<Message>;
    updateMessageGroup(UpdateMessageGroupRequest: UpdateMessageGroupRequest): MessageGroup | Promise<MessageGroup>;
    insertMessageGroup(InsertMessageGroupRequest: InsertMessageGroupRequest): MessageGroup | Promise<MessageGroup>;
    insertFrontComponentType(insertFrontComponentTypeRequest: InsertFrontComponentTypeRequest): FrontComponentType | Promise<FrontComponentType>;
    updateFrontComponentType(updateFrontComponentTypeRequest: UpdateFrontComponentTypeRequest): FrontComponentType | Promise<FrontComponentType>;
    insertAllFrontComponent(insertAllFrontComponentRequest: InsertAllFrontComponentRequest): AllFrontComponent | Promise<AllFrontComponent>;
    updateAllFrontComponent(updateAllFrontComponentRequest: UpdateAllFrontComponentRequest): AllFrontComponent | Promise<AllFrontComponent>;
}

type Nullable<T> = T | null;
