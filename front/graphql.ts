
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface PagingInput {
    skip: number;
    take: number;
}

export interface MenusRequest {
    name?: Nullable<string>;
    haveRouteYn?: Nullable<boolean>;
}

export interface RoutesRequest {
    rootYn?: Nullable<boolean>;
    seqNos?: Nullable<number[]>;
    path?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
}

export interface MessagesInput {
    seqNos?: Nullable<number[]>;
    groupsInput?: Nullable<MessageGroupsInput>;
    text?: Nullable<StringSearchInput>;
}

export interface MessageGroupsInput {
    code?: Nullable<string>;
    codes?: Nullable<string[]>;
    name?: Nullable<string>;
}

export interface StringSearchInput {
    regex?: Nullable<RegexInput>;
    like?: Nullable<LikeInput>;
}

export interface RegexInput {
    value?: Nullable<string>;
    not?: Nullable<boolean>;
}

export interface LikeInput {
    value?: Nullable<string>;
    not?: Nullable<boolean>;
}

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
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    path: string;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    childSeqNos?: Nullable<number[]>;
    roleSeqNos?: Nullable<number[]>;
    menuSeqNos?: Nullable<number[]>;
}

export interface UpdateRouteRequest {
    seqNo: number;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    desc?: Nullable<string>;
    path?: Nullable<string>;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    childSeqNos?: Nullable<number[]>;
    roleSeqNos?: Nullable<number[]>;
    menuSeqNos?: Nullable<number[]>;
}

export interface UpdateMessageInput {
    seqNo: number;
    code?: Nullable<string>;
    name?: Nullable<string>;
    text?: Nullable<string>;
    groupCode?: Nullable<string>;
}

export interface InsertMessageInput {
    code: string;
    name: string;
    text: string;
    groupCode?: Nullable<string>;
}

export interface UpdateMessageGroupInput {
    code: string;
    name?: Nullable<string>;
    messageSeqNos?: Nullable<number[]>;
}

export interface InsertMessageGroupInput {
    code: string;
    name: string;
    messageSeqNos?: Nullable<number[]>;
}

export interface InsertFrontComponentInput {
    id: string;
    allFrontComponentIds?: Nullable<number[]>;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface UpdateFrontComponentInput {
    id: string;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface InsertAllFrontComponentInput {
    id: string;
    frontComponentId?: Nullable<string>;
}

export interface UpdateAllFrontComponentInput {
    id: string;
    frontComponentId?: Nullable<string>;
}

export interface GqlCodeMap {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    childSeqNo: number;
    parentSeqNo: number;
    child: GqlCode;
    parent: GqlCode;
}

export interface GqlCode {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    children: GqlCodeMap[];
    parents: GqlCodeMap[];
}

export interface GqlRoleGroup {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    parentSeqNo?: Nullable<number>;
    roles: GqlRole[];
    children: GqlRoleGroup[];
    parent?: Nullable<GqlRoleGroup>;
}

export interface GqlMenuRoleMap {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    menuSeqNo: number;
    roleSeqNo: number;
    menu: GqlMenu;
    role: GqlRole;
    orderNo: number;
}

export interface GqlIconGroupTree {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    childSeqNo: number;
    parentSeqNo: number;
    child: GqlIconGroup;
    parent: GqlIconGroup;
}

export interface GqlIconGroup {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    children: GqlIconGroupTree[];
    parents: GqlIconGroupTree[];
}

export interface GqlIcon {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    filePath: string;
    menus: GqlMenu[];
}

export interface GqlMenu {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    iconSeqNo?: Nullable<number>;
    roles: GqlRole[];
    icon?: Nullable<GqlIcon>;
    children: GqlMenu[];
    route?: Nullable<GqlRoute>;
}

export interface GqlAllFrontComponent {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    frontComponentId?: Nullable<string>;
    frontComponent: GqlFrontComponent;
}

export interface GqlRoleFrontComponentMap {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    roleSeqNo: number;
    frontComponentId: string;
    allFrontComponentId: string;
    role: GqlRole;
    frontComponent: GqlFrontComponent;
    allFrontComponent: GqlAllFrontComponent;
}

export interface GqlFrontComponent {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    allFrontComponent?: Nullable<GqlAllFrontComponent>;
    allFrontComponents: GqlAllFrontComponent[];
    roles: GqlRole[];
    routes: GqlRoute[];
}

export interface GqlRoute {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    path: string;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    children: GqlRoute[];
    parent: GqlRoute;
    frontComponent: GqlFrontComponent;
    roles: GqlRole[];
    routeTree: GqlRouteTree;
}

export interface GqlRole {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    identifier?: Nullable<string>;
    roleGroupSeqNo?: Nullable<number>;
    roleGroup: GqlRoleGroup;
    users: GqlUser[];
    menus: GqlMenu[];
    routes: GqlRoute[];
    frontComponents: GqlFrontComponent[];
}

export interface GqlUser {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    roleSeqNo: number;
    role: GqlRole;
}

export interface GqlMenus {
    list: GqlMenu[];
    total: number;
}

export interface GqlMessageGroup {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    code: string;
    name: string;
    messages: GqlMessage[];
}

export interface GqlMessage {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    code: string;
    name: string;
    text: string;
    groupCode?: Nullable<string>;
    group: GqlMessageGroup;
}

export interface GqlPagedMessages {
    list: GqlMessage[];
    total: number;
}

export interface GqlRouteTree {
    fullPath: string;
    depth: number;
}

export interface GqlPagedRoutes {
    list: GqlRoute[];
    total: number;
}

export interface GqlPagedMessageGroups {
    list: GqlMessageGroup[];
    total: number;
}

export interface IQuery {
    authCheck(): boolean | Promise<boolean>;
    user(id: string): GqlUser | Promise<GqlUser>;
    role(seqNo: number): Nullable<GqlRoleGroup> | Promise<Nullable<GqlRoleGroup>>;
    roleFrontComponentMap(roleSeqNo: number, frontComponentId: string): Nullable<GqlRoleFrontComponentMap> | Promise<Nullable<GqlRoleFrontComponentMap>>;
    message(seqNo: number): Nullable<GqlMessage> | Promise<Nullable<GqlMessage>>;
    menus(paging: PagingInput, param?: Nullable<MenusRequest>): GqlMenus | Promise<GqlMenus>;
    rootMenus(): GqlMenu[] | Promise<GqlMenu[]>;
    route(seqNo: number): GqlRoute | Promise<GqlRoute>;
    routes(paging?: Nullable<PagingInput>, request?: Nullable<RoutesRequest>): GqlPagedRoutes | Promise<GqlPagedRoutes>;
    messages(paging?: Nullable<PagingInput>, request?: Nullable<MessagesInput>): GqlPagedMessages | Promise<GqlPagedMessages>;
    messageGroup(code: string): GqlMessageGroup | Promise<GqlMessageGroup>;
    messageGroups(paging?: Nullable<PagingInput>, request?: Nullable<MessageGroupsInput>): GqlPagedMessageGroups | Promise<GqlPagedMessageGroups>;
    frontComponent(id: string): Nullable<GqlFrontComponent> | Promise<Nullable<GqlFrontComponent>>;
    allFrontComponent(id: string): Nullable<GqlAllFrontComponent> | Promise<Nullable<GqlAllFrontComponent>>;
    allFrontComponentByCurrentUserAndFrontComponentId(frontComponentId: string): Nullable<GqlAllFrontComponent> | Promise<Nullable<GqlAllFrontComponent>>;
    icon(seqNo: number): GqlIcon | Promise<GqlIcon>;
}

export interface IMutation {
    insertRole(role: InsertRoleRequest): Nullable<GqlRole> | Promise<Nullable<GqlRole>>;
    saveRoleGroup(SaveRoleGroupRequest: SaveRoleGroupRequest): GqlRoleGroup | Promise<GqlRoleGroup>;
    removeRoleGroup(seqNo: number): GqlRoleGroup | Promise<GqlRoleGroup>;
    insertRoute(req: InsertRouteRequest): GqlRoute | Promise<GqlRoute>;
    updateRoute(req: UpdateRouteRequest): GqlRoute | Promise<GqlRoute>;
    updateMessage(updateMessageInput: UpdateMessageInput): GqlMessage | Promise<GqlMessage>;
    insertMessage(insertMessageInput: InsertMessageInput): GqlMessage | Promise<GqlMessage>;
    deleteMessages(seqNos: number[]): boolean | Promise<boolean>;
    updateMessageGroup(updateMessageGroupInput: UpdateMessageGroupInput): Nullable<GqlMessageGroup> | Promise<Nullable<GqlMessageGroup>>;
    insertMessageGroup(insertMessageGroupInput: InsertMessageGroupInput): GqlMessageGroup | Promise<GqlMessageGroup>;
    insertFrontComponent(insertFrontComponentInput: InsertFrontComponentInput): GqlFrontComponent | Promise<GqlFrontComponent>;
    updateFrontComponent(updateFrontComponentInput: UpdateFrontComponentInput): GqlFrontComponent | Promise<GqlFrontComponent>;
    insertAllFrontComponent(insertAllFrontComponentInput: InsertAllFrontComponentInput): GqlAllFrontComponent | Promise<GqlAllFrontComponent>;
    updateAllFrontComponent(updateAllFrontComponentInput: UpdateAllFrontComponentInput): GqlAllFrontComponent | Promise<GqlAllFrontComponent>;
}

export type DateTime = any;
type Nullable<T> = T | null;
