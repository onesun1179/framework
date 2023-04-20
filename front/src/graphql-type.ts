
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SortEnum {
    ASC = "ASC",
    DESC = "DESC"
}

export interface PagingInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export interface MenuEntitiesInput {
    search?: Nullable<MenuEntitiesSearchInput>;
    sort?: Nullable<MenuEntitiesSortInput>;
}

export interface MenuEntitiesSearchInput {
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

export interface MenuEntitiesSortInput {
    seqNo?: Nullable<SortTypeInput>;
}

export interface SortTypeInput {
    sort: SortEnum;
    order: number;
}

export interface MenuRoleMapEntitiesInput {
    search?: Nullable<MenuRoleMapEntitiesSearchInput>;
    sort?: Nullable<MenuRoleMapEntitiesSortInput>;
}

export interface MenuRoleMapEntitiesSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    roleSeqNo?: Nullable<NonNullableNumberSearchInput>;
    menuSeqNo?: Nullable<NonNullableNumberSearchInput>;
    orderNo?: Nullable<NonNullableNumberSearchInput>;
    parentSeqNo?: Nullable<NullableNumberSearchInput>;
    menu?: Nullable<MenuEntitiesSearchInput>;
}

export interface MenuRoleMapEntitiesSortInput {
    seqNo?: Nullable<SortTypeInput>;
    menuSeqNo?: Nullable<SortTypeInput>;
    roleSeqNo?: Nullable<SortTypeInput>;
    menu?: Nullable<MenuEntitiesSortInput>;
}

export interface RouteEntitiesInput {
    search?: Nullable<RouteEntitiesSearchInput>;
    sort?: Nullable<RouteEntitiesSortInput>;
}

export interface RouteEntitiesSearchInput {
    path?: Nullable<NonNullableStringSearchInput>;
    frontComponentId?: Nullable<NonNullableStringSearchInput>;
    parentSeqNo?: Nullable<NullableNumberSearchInput>;
}

export interface RouteEntitiesSortInput {
    seqNo?: Nullable<SortEnum>;
    code?: Nullable<SortEnum>;
    name?: Nullable<SortEnum>;
    text?: Nullable<SortEnum>;
    groupCode?: Nullable<SortEnum>;
}

export interface MessageEntitiesInput {
    search?: Nullable<MessageEntitiesSearchInput>;
    sort?: Nullable<MessageEntitiesSortInput>;
}

export interface MessageEntitiesSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    groupsInput?: Nullable<MessageGroupEntitiesInput>;
    text?: Nullable<NonNullableStringSearchInput>;
}

export interface MessageGroupEntitiesInput {
    code?: Nullable<string>;
    codes?: Nullable<string[]>;
    name?: Nullable<string>;
}

export interface MessageEntitiesSortInput {
    seqNo?: Nullable<SortTypeInput>;
    code?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
    text?: Nullable<SortTypeInput>;
    groupCode?: Nullable<SortTypeInput>;
    desc?: Nullable<SortTypeInput>;
    createdAt?: Nullable<SortTypeInput>;
    updatedAt?: Nullable<SortTypeInput>;
}

export interface ChkUniqMessageByCodeInput {
    code: string;
    groupCode: string;
}

export interface InsertRoleEntityInput {
    name: string;
    identifier?: Nullable<string>;
    roleGroupSeqNo?: Nullable<number>;
    userIds?: Nullable<string>;
    menuSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface UpdateRoleEntityInput {
    seqNo: number;
    name?: Nullable<string>;
    roleGroupSeqNo?: Nullable<number>;
    userIds?: Nullable<string>;
    menuSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface InsertRoleGroupEntityInput {
    name: string;
    parentSeqNo?: Nullable<number>;
    roleSeqNos?: Nullable<number[]>;
    childSeqNos?: Nullable<number[]>;
}

export interface UpdateRoleGroupEntityInput {
    seqNo: number;
    name?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    roleSeqNos?: Nullable<number[]>;
    childSeqNos?: Nullable<number[]>;
}

export interface UpdateMessageEntityInput {
    seqNo: number;
    code?: Nullable<string>;
    name?: Nullable<string>;
    text?: Nullable<string>;
    groupCode?: Nullable<string>;
}

export interface InsertMessageEntityInput {
    code: string;
    name: string;
    text: string;
    groupCode: string;
}

export interface UpdateMessageGroupEntityInput {
    code: string;
    name?: Nullable<string>;
    messageSeqNos?: Nullable<number[]>;
}

export interface InsertMessageGroupEntityInput {
    code: string;
    name: string;
    messageSeqNos?: Nullable<number[]>;
}

export interface InsertFrontComponentEntityInput {
    id: string;
    allFrontComponentIds?: Nullable<string[]>;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface UpdateFrontComponentEntityInput {
    id?: Nullable<string>;
    allFrontComponentIds?: Nullable<string[]>;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface InsertAllFrontComponentEntityInput {
    id: string;
    frontComponentId?: Nullable<string>;
}

export interface UpdateAllFrontComponentEntityInput {
    id: string;
    frontComponentId?: Nullable<string>;
}

export interface MessageGroupEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    code: string;
    name: string;
    messageEntities: MessageEntityOutput[];
}

export interface MessageEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    code: string;
    name: string;
    text: string;
    groupCode: string;
    sysYn: boolean;
    group: MessageGroupEntityOutput;
}

export interface MessageEntitiesOutput {
    list: MessageEntityOutput[];
    total: number;
}

export interface RoleGroupEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    parentSeqNo?: Nullable<number>;
    roles: RoleEntityOutput[];
    children: RoleGroupEntityOutput[];
    parent?: Nullable<RoleGroupEntityOutput>;
}

export interface MenuOutput {
    seqNo: number;
    name: string;
    iconSeqNo?: Nullable<number>;
    routeSeqNo?: Nullable<number>;
    menuSeqNo: number;
    parentSeqNo?: Nullable<number>;
    children: MenuOutput[];
    icon?: Nullable<IconOutput>;
    route?: Nullable<RouteOutput>;
}

export interface IconOutput {
    seqNo: number;
    name: string;
    filePath: string;
}

export interface IconEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    filePath: string;
    menus: MenuEntityOutput[];
}

export interface RoleFrontComponentMapEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    roleSeqNo: number;
    frontComponentId: string;
    allFrontComponentId: string;
    role: RoleEntityOutput;
    frontComponent: FrontComponentEntityOutput;
    allFrontComponent: AllFrontComponentEntityOutput;
}

export interface AllFrontComponentEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    frontComponentId?: Nullable<string>;
    frontComponent?: Nullable<FrontComponentEntityOutput>;
}

export interface FrontComponentEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    allFrontComponent?: Nullable<AllFrontComponentEntityOutput>;
    allFrontComponents: AllFrontComponentEntityOutput[];
    roles: RoleEntityOutput[];
    routes: RouteEntityOutput[];
}

export interface RouteOutput {
    seqNo: number;
    path: string;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    treeInfo: RouteTreeOutput;
}

export interface RouteEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    path: string;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    children: RouteEntityOutput[];
    roles: RoleEntityOutput[];
    treeInfo: RouteTreeOutput;
}

export interface MenuEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    iconSeqNo?: Nullable<number>;
    routeSeqNo?: Nullable<number>;
    roleEntities: RoleEntityOutput[];
    iconEntity?: Nullable<IconEntityOutput>;
    routeEntity?: Nullable<RouteEntityOutput>;
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
    menuEntity: MenuEntityOutput;
    roleEntity: RoleEntityOutput;
    parent?: Nullable<MenuRoleMapEntity>;
}

export interface RoleEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    identifier?: Nullable<string>;
    roleGroupSeqNo?: Nullable<number>;
    roleGroup?: Nullable<RoleGroupEntityOutput>;
    users: UserEntityOutput[];
    menus: MenuEntityOutput[];
    routes: RouteEntityOutput[];
    frontComponents: FrontComponentEntityOutput[];
}

export interface UserEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    roleSeqNo: number;
    role: RoleEntityOutput;
}

export interface CodeMapEntityOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    childSeqNo: number;
    parentSeqNo: number;
}

export interface RouteTreeOutput {
    fullPath: string;
    depth: number;
}

export interface RouteEntitiesOutput {
    list: RouteEntityOutput[];
    total: number;
}

export interface MenuEntitiesOutput {
    list: MenuEntityOutput[];
    total: number;
}

export interface MenuRoleMapEntitiesOutput {
    list: MenuRoleMapEntity[];
    total: number;
}

export interface MessageGroupEntitiesOutput {
    list: MessageGroupEntityOutput[];
    total: number;
}

export interface IQuery {
    authCheck(): boolean | Promise<boolean>;
    user(id: string): UserEntityOutput | Promise<UserEntityOutput>;
    role(seqNo: number): Nullable<RoleGroupEntityOutput> | Promise<Nullable<RoleGroupEntityOutput>>;
    roleFrontComponentMap(roleSeqNo: number, frontComponentId: string): Nullable<RoleFrontComponentMapEntityOutput> | Promise<Nullable<RoleFrontComponentMapEntityOutput>>;
    menuEntity(seqNo: number): MenuEntityOutput | Promise<MenuEntityOutput>;
    menuEntities(pagingInput?: Nullable<PagingInput>, menusInput?: Nullable<MenuEntitiesInput>): MenuEntitiesOutput | Promise<MenuEntitiesOutput>;
    menuRoleMapEntity(seqNo: number): MenuRoleMapEntity | Promise<MenuRoleMapEntity>;
    menuRoleMapEntities(pagingInput?: Nullable<PagingInput>, menuByAuthsInput?: Nullable<MenuRoleMapEntitiesInput>): MenuRoleMapEntitiesOutput | Promise<MenuRoleMapEntitiesOutput>;
    menu(seqNo: number): MenuOutput | Promise<MenuOutput>;
    menus(): MenuOutput[] | Promise<MenuOutput[]>;
    route(seqNo: number): RouteOutput | Promise<RouteOutput>;
    routeBySeqNo(seqNo: number): RouteEntityOutput | Promise<RouteEntityOutput>;
    routes(paging?: Nullable<PagingInput>, request?: Nullable<RouteEntitiesInput>): RouteEntitiesOutput | Promise<RouteEntitiesOutput>;
    messageEntityBySeqNo(seqNo: number): MessageEntityOutput | Promise<MessageEntityOutput>;
    messageEntityByCode(groupCode: string, code: string): MessageEntityOutput | Promise<MessageEntityOutput>;
    messageEntities(pagingInput?: Nullable<PagingInput>, messageEntitiesInput?: Nullable<MessageEntitiesInput>): MessageEntitiesOutput | Promise<MessageEntitiesOutput>;
    chkUniqMessageByCode(input: ChkUniqMessageByCodeInput): boolean | Promise<boolean>;
    messageGroupEntity(code: string): MessageGroupEntityOutput | Promise<MessageGroupEntityOutput>;
    messageGroupEntities(paging?: Nullable<PagingInput>, request?: Nullable<MessageGroupEntitiesInput>): MessageGroupEntitiesOutput | Promise<MessageGroupEntitiesOutput>;
    frontComponentById(frontComponentId: string): FrontComponentEntityOutput | Promise<FrontComponentEntityOutput>;
    allFrontComponentById(allFrontComponentId: string): AllFrontComponentEntityOutput | Promise<AllFrontComponentEntityOutput>;
    allFrontComponentByAuth(frontComponentId: string): Nullable<AllFrontComponentEntityOutput> | Promise<Nullable<AllFrontComponentEntityOutput>>;
    icon(seqNo: number): IconOutput | Promise<IconOutput>;
}

export interface IMutation {
    insertRole(insertRoleInput: InsertRoleEntityInput): RoleEntityOutput | Promise<RoleEntityOutput>;
    updateRole(updateRoleInput: UpdateRoleEntityInput): RoleEntityOutput | Promise<RoleEntityOutput>;
    insertRoleGroup(insertRoleGroupInput: InsertRoleGroupEntityInput): RoleGroupEntityOutput | Promise<RoleGroupEntityOutput>;
    updateRoleGroup(updateRoleGroupInput: UpdateRoleGroupEntityInput): RoleGroupEntityOutput | Promise<RoleGroupEntityOutput>;
    removeRoleGroup(seqNo: number): RoleGroupEntityOutput | Promise<RoleGroupEntityOutput>;
    updateMessageEntity(updateMessageEntityInput: UpdateMessageEntityInput): MessageEntityOutput | Promise<MessageEntityOutput>;
    insertMessageEntity(insertMessageEntityInput: InsertMessageEntityInput): MessageEntityOutput | Promise<MessageEntityOutput>;
    deleteMessageEntities(seqNos: number[]): boolean | Promise<boolean>;
    deleteMessageEntity(seqNo: number): boolean | Promise<boolean>;
    updateMessageGroupEntity(updateMessageGroupEntityInput: UpdateMessageGroupEntityInput): Nullable<MessageGroupEntityOutput> | Promise<Nullable<MessageGroupEntityOutput>>;
    insertMessageGroupEntity(insertMessageGroupEntityInput: InsertMessageGroupEntityInput): MessageGroupEntityOutput | Promise<MessageGroupEntityOutput>;
    insertFrontComponent(insertFrontComponentInput: InsertFrontComponentEntityInput): FrontComponentEntityOutput | Promise<FrontComponentEntityOutput>;
    updateFrontComponent(updateFrontComponentInput: UpdateFrontComponentEntityInput): FrontComponentEntityOutput | Promise<FrontComponentEntityOutput>;
    insertAllFrontComponent(insertAllFrontComponentInput: InsertAllFrontComponentEntityInput): AllFrontComponentEntityOutput | Promise<AllFrontComponentEntityOutput>;
    updateAllFrontComponent(updateAllFrontComponentInput: UpdateAllFrontComponentEntityInput): AllFrontComponentEntityOutput | Promise<AllFrontComponentEntityOutput>;
}

export type DateTime = any;
type Nullable<T> = T | null;
