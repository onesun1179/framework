
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Sort {
    ASC = "ASC",
    DESC = "DESC"
}

export interface PagingInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export interface MenusInput {
    search?: Nullable<MenusSearchInput>;
    sort?: Nullable<MenusSortInput>;
}

export interface MenusSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
    iconSeqNo?: Nullable<NullableNumberSearchInput>;
    routeSeqNo?: Nullable<NullableNumberSearchInput>;
}

export interface NonNullableNumberSearchInput {
    equal?: Nullable<EqualNumberSearchInput>;
    any?: Nullable<NonNullableAnyNumberSearchInput>;
    in?: Nullable<NonNullableInNumberSearchInput>;
    lessThan?: Nullable<number>;
    lessThanOrEqual?: Nullable<number>;
    moreThan?: Nullable<number>;
    moreThanOrEqual?: Nullable<number>;
    between?: Nullable<BetweenNumberSearchInput>;
}

export interface EqualNumberSearchInput {
    value: number;
    not?: Nullable<boolean>;
}

export interface NonNullableAnyNumberSearchInput {
    value: number[];
    not?: Nullable<boolean>;
}

export interface NonNullableInNumberSearchInput {
    value: number[];
    not?: Nullable<boolean>;
}

export interface BetweenNumberSearchInput {
    from: number;
    to: number;
}

export interface NonNullableStringSearchInput {
    regex?: Nullable<RegexStringSearchInput>;
    like?: Nullable<LikeStringSearchInput>;
    equal?: Nullable<EqualStringSearchInput>;
    ilike?: Nullable<IlikeStringSearchInput>;
    any?: Nullable<NonNullableAnyStringSearchInput>;
    in?: Nullable<NonNullableInStringSearchInput>;
}

export interface RegexStringSearchInput {
    value: string;
    not?: Nullable<boolean>;
}

export interface LikeStringSearchInput {
    value: string;
    not?: Nullable<boolean>;
}

export interface EqualStringSearchInput {
    value: string;
    not?: Nullable<boolean>;
}

export interface IlikeStringSearchInput {
    value: string;
    not?: Nullable<boolean>;
}

export interface NonNullableAnyStringSearchInput {
    value: string[];
    not?: Nullable<boolean>;
}

export interface NonNullableInStringSearchInput {
    value: string[];
    not?: Nullable<boolean>;
}

export interface NullableNumberSearchInput {
    equal?: Nullable<EqualNumberSearchInput>;
    any?: Nullable<NullableAnyNumberSearchInput>;
    in?: Nullable<NullableInNumberSearchInput>;
    isNull?: Nullable<boolean>;
    lessThan?: Nullable<number>;
    lessThanOrEqual?: Nullable<number>;
    moreThan?: Nullable<number>;
    moreThanOrEqual?: Nullable<number>;
    between?: Nullable<BetweenNumberSearchInput>;
}

export interface NullableAnyNumberSearchInput {
    value: Nullable<number>[];
    not?: Nullable<boolean>;
}

export interface NullableInNumberSearchInput {
    value: Nullable<number>[];
    not?: Nullable<boolean>;
}

export interface MenusSortInput {
    seqNo?: Nullable<Sort>;
}

export interface MenuRoleMapsInput {
    search?: Nullable<MenuRoleMapsSearchInput>;
    sort?: Nullable<MenuRoleMapsSortInput>;
}

export interface MenuRoleMapsSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    roleSeqNo?: Nullable<NonNullableNumberSearchInput>;
    menuSeqNo?: Nullable<NonNullableNumberSearchInput>;
    orderNo?: Nullable<NonNullableNumberSearchInput>;
    parentSeqNo?: Nullable<NullableNumberSearchInput>;
    menu?: Nullable<MenusSearchInput>;
}

export interface MenuRoleMapsSortInput {
    seqNo?: Nullable<Sort>;
    menuSeqNo?: Nullable<Sort>;
    roleSeqNo?: Nullable<Sort>;
    menu?: Nullable<MenusSortInput>;
}

export interface RoutesInput {
    search?: Nullable<RoutesSearchInput>;
    sort?: Nullable<RoutesSortInput>;
}

export interface RoutesSearchInput {
    path?: Nullable<NonNullableStringSearchInput>;
    frontComponentId?: Nullable<NonNullableStringSearchInput>;
    parentSeqNo?: Nullable<NullableNumberSearchInput>;
}

export interface RoutesSortInput {
    seqNo?: Nullable<Sort>;
    code?: Nullable<Sort>;
    name?: Nullable<Sort>;
    text?: Nullable<Sort>;
    groupCode?: Nullable<Sort>;
}

export interface MessagesInput {
    search?: Nullable<MessagesSearchInput>;
    sort?: Nullable<MessagesSortInput>;
}

export interface MessagesSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    groupsInput?: Nullable<MessageGroupsInput>;
    text?: Nullable<NonNullableStringSearchInput>;
}

export interface MessageGroupsInput {
    code?: Nullable<string>;
    codes?: Nullable<string[]>;
    name?: Nullable<string>;
}

export interface MessagesSortInput {
    seqNo?: Nullable<Sort>;
    code?: Nullable<Sort>;
    name?: Nullable<Sort>;
    text?: Nullable<Sort>;
    groupCode?: Nullable<Sort>;
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

export interface MessageGroupEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    code: string;
    name: string;
    messages: MessageEntity[];
}

export interface MessageEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    code: string;
    name: string;
    text: string;
    groupCode?: Nullable<string>;
    group: MessageGroupEntity;
}

export interface MessagesOutput {
    list: MessageEntity[];
    total: number;
}

export interface RoleGroupEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    parentSeqNo?: Nullable<number>;
    roles: RoleEntity[];
    children: RoleGroupEntity[];
    parent?: Nullable<RoleGroupEntity>;
}

export interface IconEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    filePath: string;
    menus: MenuEntity[];
}

export interface MenuEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    iconSeqNo?: Nullable<number>;
    routeSeqNo?: Nullable<number>;
    roles: RoleEntity[];
    icon?: Nullable<IconEntity>;
    route?: Nullable<RouteEntity>;
}

export interface RoleFrontComponentMapEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    roleSeqNo: number;
    frontComponentId: string;
    allFrontComponentId: string;
    role: RoleEntity;
    frontComponent: FrontComponentEntity;
    allFrontComponent: AllFrontComponentEntity;
}

export interface AllFrontComponentEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    frontComponentId?: Nullable<string>;
    frontComponent?: Nullable<FrontComponentEntity>;
}

export interface FrontComponentEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    allFrontComponent?: Nullable<AllFrontComponentEntity>;
    allFrontComponents: AllFrontComponentEntity[];
    roles: RoleEntity[];
    routes: RouteEntity[];
}

export interface RouteEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    path: string;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    children: RouteEntity[];
    roles: RoleEntity[];
    treeInfo: RouteTreeOutput;
}

export interface MenuRoleMapEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    menuSeqNo: number;
    roleSeqNo: number;
    parentSeqNo?: Nullable<number>;
    orderNo: number;
    menu: MenuEntity;
    role: RoleEntity;
    parent?: Nullable<MenuRoleMapEntity>;
}

export interface RoleEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    identifier?: Nullable<string>;
    roleGroupSeqNo?: Nullable<number>;
    roleGroup?: Nullable<RoleGroupEntity>;
    users: UserEntity[];
    menus: MenuEntity[];
    routes: RouteEntity[];
    frontComponents: FrontComponentEntity[];
}

export interface UserEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    roleSeqNo: number;
    role: RoleEntity;
}

export interface CodeMapEntity {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    childSeqNo: number;
    parentSeqNo: number;
}

export interface RoutesOutput {
    list: RouteEntity[];
    total: number;
}

export interface RouteTreeOutput {
    fullPath: string;
    depth: number;
}

export interface MenusOutput {
    list: MenuEntity[];
    total: number;
}

export interface MenuRoleMapsOutput {
    list: MenuRoleMapEntity[];
    total: number;
}

export interface MessageGroupsOutput {
    list: MessageGroupEntity[];
    total: number;
}

export interface IQuery {
    authCheck(): boolean | Promise<boolean>;
    user(id: string): UserEntity | Promise<UserEntity>;
    role(seqNo: number): Nullable<RoleGroupEntity> | Promise<Nullable<RoleGroupEntity>>;
    roleFrontComponentMap(roleSeqNo: number, frontComponentId: string): Nullable<RoleFrontComponentMapEntity> | Promise<Nullable<RoleFrontComponentMapEntity>>;
    menu(menuSeqNo: number): MenuEntity | Promise<MenuEntity>;
    menus(pagingInput?: Nullable<PagingInput>, menusInput?: Nullable<MenusInput>): MenusOutput | Promise<MenusOutput>;
    menuRoleMap(seqNo: number): MenuRoleMapEntity | Promise<MenuRoleMapEntity>;
    menuByAuthByMenuAndRole(menuSeqNo: number, roleSeqNo: number): MenuRoleMapEntity | Promise<MenuRoleMapEntity>;
    menuRoleMaps(pagingInput?: Nullable<PagingInput>, menuByAuthsInput?: Nullable<MenuRoleMapsInput>): MenuRoleMapsOutput | Promise<MenuRoleMapsOutput>;
    routeBySeqNo(seqNo: number): RouteEntity | Promise<RouteEntity>;
    routes(paging?: Nullable<PagingInput>, request?: Nullable<RoutesInput>): RoutesOutput | Promise<RoutesOutput>;
    messageBySeqNo(seqNo: number): MessageEntity | Promise<MessageEntity>;
    messageByCode(groupCode: string, code: string): MessageEntity | Promise<MessageEntity>;
    messages(pagingInput?: Nullable<PagingInput>, messagesInput?: Nullable<MessagesInput>): MessagesOutput | Promise<MessagesOutput>;
    messageGroup(code: string): MessageGroupEntity | Promise<MessageGroupEntity>;
    messageGroups(paging?: Nullable<PagingInput>, request?: Nullable<MessageGroupsInput>): MessageGroupsOutput | Promise<MessageGroupsOutput>;
    frontComponentById(frontComponentId: string): FrontComponentEntity | Promise<FrontComponentEntity>;
    allFrontComponentById(allFrontComponentId: string): AllFrontComponentEntity | Promise<AllFrontComponentEntity>;
    allFrontComponentByAuth(frontComponentId: string): Nullable<AllFrontComponentEntity> | Promise<Nullable<AllFrontComponentEntity>>;
    icon(seqNo: number): IconEntity | Promise<IconEntity>;
}

export interface IMutation {
    insertRole(insertRoleInput: InsertRoleInput): RoleEntity | Promise<RoleEntity>;
    updateRole(updateRoleInput: UpdateRoleInput): RoleEntity | Promise<RoleEntity>;
    insertRoleGroup(insertRoleGroupInput: InsertRoleGroupInput): RoleGroupEntity | Promise<RoleGroupEntity>;
    updateRoleGroup(updateRoleGroupInput: UpdateRoleGroupInput): RoleGroupEntity | Promise<RoleGroupEntity>;
    removeRoleGroup(seqNo: number): RoleGroupEntity | Promise<RoleGroupEntity>;
    updateMessage(updateMessageInput: UpdateMessageInput): MessageEntity | Promise<MessageEntity>;
    insertMessage(insertMessageInput: InsertMessageInput): MessageEntity | Promise<MessageEntity>;
    deleteMessages(seqNos: number[]): boolean | Promise<boolean>;
    updateMessageGroup(updateMessageGroupInput: UpdateMessageGroupInput): Nullable<MessageGroupEntity> | Promise<Nullable<MessageGroupEntity>>;
    insertMessageGroup(insertMessageGroupInput: InsertMessageGroupInput): MessageGroupEntity | Promise<MessageGroupEntity>;
    insertFrontComponent(insertFrontComponentInput: InsertFrontComponentInput): FrontComponentEntity | Promise<FrontComponentEntity>;
    updateFrontComponent(updateFrontComponentInput: UpdateFrontComponentInput): FrontComponentEntity | Promise<FrontComponentEntity>;
    insertAllFrontComponent(insertAllFrontComponentInput: InsertAllFrontComponentInput): AllFrontComponentEntity | Promise<AllFrontComponentEntity>;
    updateAllFrontComponent(updateAllFrontComponentInput: UpdateAllFrontComponentInput): AllFrontComponentEntity | Promise<AllFrontComponentEntity>;
}

export type DateTime = any;
type Nullable<T> = T | null;
