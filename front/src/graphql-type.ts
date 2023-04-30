
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
    skip: number;
    take: number;
}

export interface CodesInput {
    search?: Nullable<CodesSearchInput>;
    sort?: Nullable<CodesSortInput>;
}

export interface CodesSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
    parent?: Nullable<ParentCodesSearchInput>;
}

export interface NonNullableNumberSearchInput {
    equal?: Nullable<EqualNumberSearchInput>;
    any?: Nullable<NonNullableAnyNumberSearchInput>;
    in?: Nullable<NonNullableInNumberSearchInput>;
    lessThan?: Nullable<LessThanNumberSearchInput>;
    moreThan?: Nullable<MoreThanNumberSearchInput>;
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

export interface LessThanNumberSearchInput {
    value: number;
    not?: Nullable<boolean>;
}

export interface MoreThanNumberSearchInput {
    value: number;
    not?: Nullable<boolean>;
}

export interface BetweenNumberSearchInput {
    from: number;
    to: number;
    not?: Nullable<boolean>;
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

export interface ParentCodesSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
}

export interface CodesSortInput {
    seqNo?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
}

export interface SortTypeInput {
    sort: SortEnum;
    order: number;
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
    role?: Nullable<RoleSearchInput>;
}

export interface NullableNumberSearchInput {
    equal?: Nullable<EqualNumberSearchInput>;
    any?: Nullable<NullableAnyNumberSearchInput>;
    in?: Nullable<NullableInNumberSearchInput>;
    isNull?: Nullable<IsNullNumberSearchInput>;
    lessThan?: Nullable<LessThanNumberSearchInput>;
    moreThan?: Nullable<MoreThanNumberSearchInput>;
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

export interface IsNullNumberSearchInput {
    value: boolean;
}

export interface RoleSearchInput {
    parentSeqNo?: Nullable<NullableNumberSearchInput>;
    orderNo?: Nullable<NonNullableNumberSearchInput>;
}

export interface MenusSortInput {
    seqNo?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
    iconSeqNo?: Nullable<SortTypeInput>;
    routeSeqNo?: Nullable<SortTypeInput>;
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
    seqNo?: Nullable<SortTypeInput>;
    menuSeqNo?: Nullable<SortTypeInput>;
    roleSeqNo?: Nullable<SortTypeInput>;
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
    seqNo?: Nullable<SortEnum>;
    code?: Nullable<SortEnum>;
    name?: Nullable<SortEnum>;
    text?: Nullable<SortEnum>;
    groupCode?: Nullable<SortEnum>;
}

export interface MessagesInput {
    search?: Nullable<MessagesSearchInput>;
    sort?: Nullable<MessagesSortInput>;
}

export interface MessagesSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
    text?: Nullable<NonNullableStringSearchInput>;
    groupCode?: Nullable<NonNullableStringSearchInput>;
}

export interface MessagesSortInput {
    seqNo?: Nullable<SortTypeInput>;
    code?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
    text?: Nullable<SortTypeInput>;
    groupCode?: Nullable<SortTypeInput>;
    desc?: Nullable<SortTypeInput>;
    createdAt?: Nullable<SortTypeInput>;
    updatedAt?: Nullable<SortTypeInput>;
}

export interface MessageGroupsInput {
    search?: Nullable<MessageGroupsSearchInput>;
    sort?: Nullable<MessageGroupsSortInput>;
}

export interface MessageGroupsSearchInput {
    code?: Nullable<NonNullableStringSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
}

export interface MessageGroupsSortInput {
    code?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
    desc?: Nullable<SortTypeInput>;
    createdAt?: Nullable<SortTypeInput>;
    updatedAt?: Nullable<SortTypeInput>;
}

export interface FrontComponentsInput {
    search?: Nullable<FrontComponentsSearchInput>;
    sort?: Nullable<FrontComponentsSortInput>;
}

export interface FrontComponentsSearchInput {
    id?: Nullable<NonNullableStringSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
}

export interface FrontComponentsSortInput {
    id?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
    desc?: Nullable<SortTypeInput>;
    createdAt?: Nullable<SortTypeInput>;
    updatedAt?: Nullable<SortTypeInput>;
}

export interface AllFrontComponentsInput {
    search?: Nullable<AllFrontComponentsSearchInput>;
    sort?: Nullable<AllFrontComponentsSortInput>;
}

export interface AllFrontComponentsSearchInput {
    id?: Nullable<NonNullableStringSearchInput>;
    frontComponentId?: Nullable<NullableStringSearchInput>;
}

export interface NullableStringSearchInput {
    regex?: Nullable<RegexStringSearchInput>;
    like?: Nullable<LikeStringSearchInput>;
    equal?: Nullable<EqualStringSearchInput>;
    ilike?: Nullable<IlikeStringSearchInput>;
    any?: Nullable<NullableAnyStringSearchInput>;
    in?: Nullable<NullableInStringSearchInput>;
    isNull?: Nullable<IsNullStringSearchInput>;
}

export interface NullableAnyStringSearchInput {
    value: Nullable<string>[];
    not?: Nullable<boolean>;
}

export interface NullableInStringSearchInput {
    value: Nullable<string>[];
    not?: Nullable<boolean>;
}

export interface IsNullStringSearchInput {
    value: boolean;
}

export interface AllFrontComponentsSortInput {
    id?: Nullable<SortTypeInput>;
    frontComponentId?: Nullable<SortTypeInput>;
    desc?: Nullable<SortTypeInput>;
    createdAt?: Nullable<SortTypeInput>;
    updatedAt?: Nullable<SortTypeInput>;
}

export interface RolesInput {
    search?: Nullable<RolesSearchInput>;
    sort?: Nullable<RolesSortInput>;
}

export interface RolesSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
    identifier?: Nullable<NullableStringSearchInput>;
}

export interface RolesSortInput {
    seqNo?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
    identifier?: Nullable<SortTypeInput>;
    desc?: Nullable<SortTypeInput>;
    createdAt?: Nullable<SortTypeInput>;
    updatedAt?: Nullable<SortTypeInput>;
}

export interface RoleGroupsInput {
    search?: Nullable<RoleGroupsSearchInput>;
    sort?: Nullable<RoleGroupsSortInput>;
}

export interface RoleGroupsSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
    parentSeqNo?: Nullable<NullableNumberSearchInput>;
}

export interface RoleGroupsSortInput {
    seqNo?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
    parentSeqNo?: Nullable<SortTypeInput>;
    desc?: Nullable<SortTypeInput>;
    createdAt?: Nullable<SortTypeInput>;
    updatedAt?: Nullable<SortTypeInput>;
}

export interface IconsInput {
    search?: Nullable<IconsSearchInput>;
    sort?: Nullable<IconsSortInput>;
}

export interface IconsSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
    filePath?: Nullable<NonNullableStringSearchInput>;
    iconLabel?: Nullable<IconLabelsSearchInput>;
}

export interface IconLabelsSearchInput {
    seqNo?: Nullable<NonNullableNumberSearchInput>;
    name?: Nullable<NonNullableStringSearchInput>;
}

export interface IconsSortInput {
    seqNo?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
    filePath?: Nullable<SortTypeInput>;
}

export interface IconLabelsInput {
    search?: Nullable<IconLabelsSearchInput>;
    sort?: Nullable<IconLabelsSortInput>;
}

export interface IconLabelsSortInput {
    seqNo?: Nullable<SortTypeInput>;
    name?: Nullable<SortTypeInput>;
}

export interface InsertCodeInput {
    desc?: Nullable<string>;
    name: string;
    parentCodeSeqNos?: Nullable<number[]>;
    childCodeSeqNos?: Nullable<number[]>;
}

export interface UpdateCodeInput {
    seqNo: number;
    desc?: Nullable<string>;
    name?: Nullable<string>;
    parentCodeSeqNos?: Nullable<number[]>;
    childCodeSeqNos?: Nullable<number[]>;
}

export interface InsertMenuInput {
    desc?: Nullable<string>;
    name: string;
    iconSeqNo?: Nullable<number>;
    routeSeqNo?: Nullable<number>;
}

export interface UpdateMenuInput {
    seqNo: number;
    desc?: Nullable<string>;
    name: string;
    iconSeqNo?: Nullable<number>;
    routeSeqNo?: Nullable<number>;
}

export interface UpdateMessageInput {
    seqNo: number;
    desc?: Nullable<string>;
    code?: Nullable<string>;
    name?: Nullable<string>;
    text?: Nullable<string>;
    groupCode?: Nullable<string>;
}

export interface InsertMessageInput {
    desc?: Nullable<string>;
    code: string;
    name: string;
    text: string;
    groupCode: string;
}

export interface ChkUniqMessageByCodeInput {
    code: string;
    groupCode: string;
}

export interface UpdateMessageGroupInput {
    desc?: Nullable<string>;
    code: string;
    name: string;
}

export interface InsertMessageGroupInput {
    desc?: Nullable<string>;
    code: string;
    name: string;
}

export interface InsertFrontComponentInput {
    desc?: Nullable<string>;
    id: string;
    name: string;
    allFrontComponentIds?: Nullable<string[]>;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface UpdateFrontComponentInput {
    desc?: Nullable<string>;
    id: string;
    name: string;
    allFrontComponentIds?: Nullable<string[]>;
    roleSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface InsertAllFrontComponentInput {
    desc?: Nullable<string>;
    id: string;
    frontComponentId?: Nullable<string>;
}

export interface UpdateAllFrontComponentInput {
    desc?: Nullable<string>;
    id: string;
    frontComponentId?: Nullable<string>;
}

export interface ChkUniqByAllFcIdInput {
    id: string;
}

export interface InsertRoleInput {
    desc?: Nullable<string>;
    name: string;
    roleGroupSeqNo: number;
    userIds?: Nullable<string>;
    menuSeqNos?: Nullable<number[]>;
    routeSeqNos?: Nullable<number[]>;
}

export interface UpdateRoleInput {
    seqNo: number;
    desc?: Nullable<string>;
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

export interface MessageGroupOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    code: string;
    name: string;
    messages: MessageOutput[];
}

export interface MessageOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    code: string;
    name: string;
    text: string;
    groupCode: string;
    group: MessageGroupOutput;
}

export interface MessagesOutput {
    list: MessageOutput[];
    total: number;
}

export interface MessageGroupsOutput {
    list: MessageGroupOutput[];
    total: number;
}

export interface RoleGroupOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    parentSeqNo?: Nullable<number>;
    roles: RoleOutput[];
    children: RoleGroupOutput[];
    parent?: Nullable<RoleGroupOutput>;
}

export interface IconLabelOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    icons: IconOutput[];
}

export interface IconOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    filePath: string;
    menus: MenuOutput[];
    fileFullPath: string;
    labels: IconLabelOutput[];
}

export interface RoleFrontComponentMapOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    roleSeqNo: number;
    frontComponentId: string;
    allFrontComponentId: string;
    role: RoleOutput;
    frontComponent: FrontComponentOutput;
    allFrontComponent: AllFrontComponentOutput;
}

export interface AllFrontComponentOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    frontComponentId?: Nullable<string>;
    frontComponent?: Nullable<FrontComponentOutput>;
}

export interface FrontComponentOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    name: string;
    allFrontComponent?: Nullable<AllFrontComponentOutput>;
    allFrontComponentByRole?: Nullable<AllFrontComponentOutput>;
    allFrontComponents: AllFrontComponentOutput[];
    roles: RoleOutput[];
    routes: RouteOutput[];
}

export interface RouteOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    path: string;
    frontComponentId?: Nullable<string>;
    parentSeqNo?: Nullable<number>;
    children: RouteOutput[];
    roles: RoleOutput[];
    treeInfo: RouteTreeOutput;
}

export interface MenuOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    iconSeqNo?: Nullable<number>;
    routeSeqNo?: Nullable<number>;
    roles: RoleOutput[];
    icon?: Nullable<IconOutput>;
    route?: Nullable<RouteOutput>;
    children: MenuOutput[];
}

export interface MenuRoleMapOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    menuSeqNo: number;
    roleSeqNo: number;
    parentSeqNo?: Nullable<number>;
    orderNo: number;
    menu: MenuOutput;
    role: RoleOutput;
    parent?: Nullable<MenuRoleMapOutput>;
}

export interface RoleOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    identifier?: Nullable<string>;
    roleGroupSeqNo: number;
    roleGroup?: Nullable<RoleGroupOutput>;
    users: UserOutput[];
    menus: MenuOutput[];
    routes: RouteOutput[];
    frontComponents: FrontComponentOutput[];
}

export interface UserOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    id: string;
    roleSeqNo: number;
    role: RoleOutput;
}

export interface RolesOutput {
    list: RoleOutput[];
    total: number;
}

export interface RoleGroupsOutput {
    list: RoleGroupOutput[];
    total: number;
}

export interface AllFrontComponentsOutput {
    list: AllFrontComponentOutput[];
    total: number;
}

export interface FrontComponentsOutput {
    list: FrontComponentOutput[];
    total: number;
}

export interface CodeOutput {
    createdAt: DateTime;
    updatedAt: DateTime;
    desc?: Nullable<string>;
    seqNo: number;
    name: string;
    parents: CodesOutput;
    children: CodesOutput;
}

export interface CodesOutput {
    list: CodeOutput[];
    total: number;
}

export interface RoutesOutput {
    list: RouteOutput[];
    total: number;
}

export interface RouteTreeOutput {
    fullPath: string;
    depth: number;
}

export interface IconsOutput {
    list: IconOutput[];
    total: number;
}

export interface MenusOutput {
    list: MenuOutput[];
    total: number;
}

export interface MenuRoleMapsOutput {
    list: MenuRoleMapOutput[];
    total: number;
}

export interface IconLabelsOutput {
    list: IconLabelOutput[];
    total: number;
}

export interface IQuery {
    authCheck(): boolean | Promise<boolean>;
    user(id: string): UserOutput | Promise<UserOutput>;
    parentCodes(seqNo: number, pagingInput?: Nullable<PagingInput>): CodesOutput | Promise<CodesOutput>;
    childCodes(seqNo: number, pagingInput?: Nullable<PagingInput>): CodesOutput | Promise<CodesOutput>;
    nonChildCodes(seqNo: number): CodesOutput | Promise<CodesOutput>;
    code(seqNo: number): CodeOutput | Promise<CodeOutput>;
    codes(pagingInput?: Nullable<PagingInput>, codesInput?: Nullable<CodesInput>): CodesOutput | Promise<CodesOutput>;
    menu(seqNo: number): MenuOutput | Promise<MenuOutput>;
    menus(pagingInput?: Nullable<PagingInput>, menusInput?: Nullable<MenusInput>): MenusOutput | Promise<MenusOutput>;
    menuRoleMap(seqNo: number): MenuRoleMapOutput | Promise<MenuRoleMapOutput>;
    menuRoleMaps(pagingInput?: Nullable<PagingInput>, menuByAuthsInput?: Nullable<MenuRoleMapsInput>): MenuRoleMapsOutput | Promise<MenuRoleMapsOutput>;
    route(seqNo: number): RouteOutput | Promise<RouteOutput>;
    routes(paging?: Nullable<PagingInput>, request?: Nullable<RoutesInput>): RoutesOutput | Promise<RoutesOutput>;
    messageBySeqNo(seqNo: number): MessageOutput | Promise<MessageOutput>;
    messageByCode(groupCode: string, code: string): MessageOutput | Promise<MessageOutput>;
    messages(pagingInput?: Nullable<PagingInput>, messagesInput?: Nullable<MessagesInput>): MessagesOutput | Promise<MessagesOutput>;
    messageGroup(code: string): MessageGroupOutput | Promise<MessageGroupOutput>;
    messageGroups(pagingInput?: Nullable<PagingInput>, messageGroupsInput?: Nullable<MessageGroupsInput>): MessageGroupsOutput | Promise<MessageGroupsOutput>;
    frontComponents(pagingInput?: Nullable<PagingInput>, frontComponentsInput?: Nullable<FrontComponentsInput>): FrontComponentsOutput | Promise<FrontComponentsOutput>;
    frontComponentById(frontComponentId: string): FrontComponentOutput | Promise<FrontComponentOutput>;
    allFrontComponentById(allFrontComponentId: string): AllFrontComponentOutput | Promise<AllFrontComponentOutput>;
    allFrontComponentByIdAndRole(frontComponentId: string, roleSeqNo: number): Nullable<AllFrontComponentOutput> | Promise<Nullable<AllFrontComponentOutput>>;
    allFrontComponents(pagingInput?: Nullable<PagingInput>, allFrontComponentsInput?: Nullable<AllFrontComponentsInput>): AllFrontComponentsOutput | Promise<AllFrontComponentsOutput>;
    allFrontComponentByFcId(frontComponentId: string): Nullable<AllFrontComponentOutput> | Promise<Nullable<AllFrontComponentOutput>>;
    role(seqNo: number): Nullable<RoleOutput> | Promise<Nullable<RoleOutput>>;
    roles(pagingInput?: Nullable<PagingInput>, rolesInput?: Nullable<RolesInput>): RolesOutput | Promise<RolesOutput>;
    roleGroups(pagingInput?: Nullable<PagingInput>, roleGroupsInput?: Nullable<RoleGroupsInput>): RoleGroupsOutput | Promise<RoleGroupsOutput>;
    roleFrontComponentMap(roleSeqNo: number, frontComponentId: string): Nullable<RoleFrontComponentMapOutput> | Promise<Nullable<RoleFrontComponentMapOutput>>;
    icon(seqNo: number): IconOutput | Promise<IconOutput>;
    icons(pagingInput?: Nullable<PagingInput>, iconsInput?: Nullable<IconsInput>): IconsOutput | Promise<IconsOutput>;
    iconLabel(iconLabelSeqNo: number): IconLabelOutput | Promise<IconLabelOutput>;
    iconLabels(pagingInput?: Nullable<PagingInput>, iconLabelsInput?: Nullable<IconLabelsInput>): IconLabelsOutput | Promise<IconLabelsOutput>;
    iconLabelByIconSeqNo(iconSeqNo: number): IconLabelOutput[] | Promise<IconLabelOutput[]>;
}

export interface IMutation {
    insertCode(insertCodeInput: InsertCodeInput): CodeOutput | Promise<CodeOutput>;
    updateCode(updateCodeInput: UpdateCodeInput): CodeOutput | Promise<CodeOutput>;
    insertMenu(insertMenuInput: InsertMenuInput): MenuOutput | Promise<MenuOutput>;
    updateMenu(updateMenuInput: UpdateMenuInput): MenuOutput | Promise<MenuOutput>;
    updateMessage(updateMessageInput: UpdateMessageInput): MessageOutput | Promise<MessageOutput>;
    insertMessage(insertMessageInput: InsertMessageInput): MessageOutput | Promise<MessageOutput>;
    deleteMessages(seqNos: number[]): boolean | Promise<boolean>;
    deleteMessage(seqNo: number): boolean | Promise<boolean>;
    chkUniqMessageByCode(input: ChkUniqMessageByCodeInput): boolean | Promise<boolean>;
    updateMessageGroup(updateMessageGroupInput: UpdateMessageGroupInput): Nullable<MessageGroupOutput> | Promise<Nullable<MessageGroupOutput>>;
    insertMessageGroup(insertMessageGroupInput: InsertMessageGroupInput): MessageGroupOutput | Promise<MessageGroupOutput>;
    enableMessageGroupOfCode(code: string): boolean | Promise<boolean>;
    insertFrontComponent(insertFrontComponentInput: InsertFrontComponentInput): FrontComponentOutput | Promise<FrontComponentOutput>;
    updateFrontComponent(updateFrontComponentInput: UpdateFrontComponentInput): FrontComponentOutput | Promise<FrontComponentOutput>;
    insertAllFrontComponent(insertAllFrontComponentInput: InsertAllFrontComponentInput): AllFrontComponentOutput | Promise<AllFrontComponentOutput>;
    updateAllFrontComponent(updateAllFrontComponentInput: UpdateAllFrontComponentInput): AllFrontComponentOutput | Promise<AllFrontComponentOutput>;
    chkUniqByAllFcId(input: ChkUniqByAllFcIdInput): boolean | Promise<boolean>;
    insertRole(insertRoleInput: InsertRoleInput): RoleOutput | Promise<RoleOutput>;
    updateRole(updateRoleInput: UpdateRoleInput): RoleOutput | Promise<RoleOutput>;
    insertRoleGroup(insertRoleGroupInput: InsertRoleGroupInput): RoleGroupOutput | Promise<RoleGroupOutput>;
    updateRoleGroup(updateRoleGroupInput: UpdateRoleGroupInput): RoleGroupOutput | Promise<RoleGroupOutput>;
    removeRoleGroup(seqNo: number): RoleGroupOutput | Promise<RoleGroupOutput>;
    updateAllFrontComponentByRoleFrontComponentMap(roleSeqNo: number, frontComponentId: string, allFrontComponentId: string): RoleFrontComponentMapOutput | Promise<RoleFrontComponentMapOutput>;
}

export type DateTime = any;
type Nullable<T> = T | null;
