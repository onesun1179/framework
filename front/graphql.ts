
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface PagingInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export interface RoutesInput {
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

export interface InsertRoleInput {
    name: string;
    identifier?: Nullable<string>;
    roleGroupSeqNo?: Nullable<number>;
    userIds?: Nullable<string>;
    menuSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface UpdateRoleInput {
    seqNo: number;
    name?: Nullable<string>;
    roleGroupSeqNo?: Nullable<number>;
    userIds?: Nullable<string>;
    menuSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface InsertRoleGroupInput {
    name: string;
    parentSeqNo?: Nullable<number>;
    roleSeqNos?: Nullable<number[]>;
    childSeqNos?: Nullable<number[]>;
}

export interface UpdateRoleGroupInput {
    seqNo: number;
    name?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    roleSeqNos?: Nullable<number[]>;
    childSeqNos?: Nullable<number[]>;
}

export interface InsertRouteInput {
    path: string;
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
    allFrontComponentIds?: Nullable<string[]>;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface UpdateFrontComponentInput {
    id?: Nullable<string>;
    allFrontComponentIds?: Nullable<string[]>;
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
    children?: Nullable<GqlCodeMap[]>;
    parents?: Nullable<GqlCodeMap[]>;
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
    role: GqlRole;
    orderNo: number;
}

export interface GqlIconGroup {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
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
    routeSeqNo?: Nullable<number>;
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
    frontComponent?: Nullable<GqlFrontComponent>;
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
    roleGroup?: Nullable<GqlRoleGroup>;
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

export interface GqlPagedRoutes {
    list: GqlRoute[];
    total: number;
}

export interface GqlRouteTree {
    fullPath: string;
    depth: number;
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
    rootMenus(): GqlMenu[] | Promise<GqlMenu[]>;
    route(seqNo: number): GqlRoute | Promise<GqlRoute>;
    routes(paging?: Nullable<PagingInput>, request?: Nullable<RoutesInput>): GqlPagedRoutes | Promise<GqlPagedRoutes>;
    messages(paging?: Nullable<PagingInput>, request?: Nullable<MessagesInput>): GqlPagedMessages | Promise<GqlPagedMessages>;
    messageGroup(code: string): GqlMessageGroup | Promise<GqlMessageGroup>;
    messageGroups(paging?: Nullable<PagingInput>, request?: Nullable<MessageGroupsInput>): GqlPagedMessageGroups | Promise<GqlPagedMessageGroups>;
    frontComponent(id: string): Nullable<GqlFrontComponent> | Promise<Nullable<GqlFrontComponent>>;
    allFrontComponent(id: string): Nullable<GqlAllFrontComponent> | Promise<Nullable<GqlAllFrontComponent>>;
    icon(seqNo: number): GqlIcon | Promise<GqlIcon>;
}

export interface IMutation {
    insertRole(insertRoleInput: InsertRoleInput): GqlRole | Promise<GqlRole>;
    updateRole(updateRoleInput: UpdateRoleInput): GqlRole | Promise<GqlRole>;
    insertRoleGroup(insertRoleGroupInput: InsertRoleGroupInput): GqlRoleGroup | Promise<GqlRoleGroup>;
    updateRoleGroup(updateRoleGroupInput: UpdateRoleGroupInput): GqlRoleGroup | Promise<GqlRoleGroup>;
    removeRoleGroup(seqNo: number): GqlRoleGroup | Promise<GqlRoleGroup>;
    insertRoute(req: InsertRouteInput): GqlRoute | Promise<GqlRoute>;
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
