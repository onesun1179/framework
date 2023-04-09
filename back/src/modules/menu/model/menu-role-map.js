"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuRoleMap = void 0;
var typeorm_1 = require("typeorm");
var role_1 = require("@modules/role/model/role");
var common_entity_1 = require("@common/entity/common.entity");
var menu_1 = require("./menu");
var graphql_1 = require("@nestjs/graphql");
var menu_role_map_tree_1 = require("@modules/menu/model/menu-role-map-tree");
var MenuRoleMap = /** @class */ (function (_super) {
    __extends(MenuRoleMap, _super);
    function MenuRoleMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], MenuRoleMap.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], MenuRoleMap.prototype, "menuSeqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], MenuRoleMap.prototype, "roleSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return menu_1.Menu; }, function (o) { return o.menuRoleMaps; }),
        (0, graphql_1.Field)(function () { return menu_1.Menu; }),
        (0, typeorm_1.JoinColumn)({
            name: 'menu_seq_no'
        })
    ], MenuRoleMap.prototype, "menu");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return role_1.Role; }, function (o) { return o.menuRoleMaps; }),
        (0, graphql_1.Field)(function () { return role_1.Role; }),
        (0, typeorm_1.JoinColumn)({
            name: 'role_seq_no'
        })
    ], MenuRoleMap.prototype, "role");
    __decorate([
        (0, graphql_1.Field)(function () { return graphql_1.Int; }),
        (0, typeorm_1.Column)({
            type: 'int'
        })
    ], MenuRoleMap.prototype, "orderNo");
    __decorate([
        (0, typeorm_1.RelationId)(function (o) { return o.parents; })
    ], MenuRoleMap.prototype, "parentSeqNos");
    __decorate([
        (0, typeorm_1.RelationId)(function (o) { return o.children; })
    ], MenuRoleMap.prototype, "childSeqNos");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return menu_role_map_tree_1.MenuRoleMapTree; }, function (o) { return o.parentMenuRoleMap; })
    ], MenuRoleMap.prototype, "parents");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return menu_role_map_tree_1.MenuRoleMapTree; }, function (o) { return o.childMenuRoleMap; })
    ], MenuRoleMap.prototype, "children");
    MenuRoleMap = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlMenuRoleMap'),
        (0, typeorm_1.Index)(['menuSeqNo', 'roleSeqNo'], {
            unique: true
        })
    ], MenuRoleMap);
    return MenuRoleMap;
}(common_entity_1.CommonEntity));
exports.MenuRoleMap = MenuRoleMap;
