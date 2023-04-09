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
exports.MenuRoleMapTree = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var graphql_1 = require("@nestjs/graphql");
var menu_role_map_1 = require("@modules/menu/model/menu-role-map");
var MenuRoleMapTree = /** @class */ (function (_super) {
    __extends(MenuRoleMapTree, _super);
    function MenuRoleMapTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], MenuRoleMapTree.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], MenuRoleMapTree.prototype, "childMenuRoleMapSeqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], MenuRoleMapTree.prototype, "parentMenuRoleMapSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return menu_role_map_1.MenuRoleMap; }, function (o) { return o.children; }),
        (0, graphql_1.Field)(function () { return menu_role_map_1.MenuRoleMap; }),
        (0, typeorm_1.JoinColumn)({
            name: 'child_menu_role_map_seq_no'
        })
    ], MenuRoleMapTree.prototype, "childMenuRoleMap");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return menu_role_map_1.MenuRoleMap; }, function (o) { return o.parents; }),
        (0, graphql_1.Field)(function () { return menu_role_map_1.MenuRoleMap; }),
        (0, typeorm_1.JoinColumn)({
            name: 'parent_menu_role_map_seq_no'
        })
    ], MenuRoleMapTree.prototype, "parentMenuRoleMap");
    MenuRoleMapTree = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)('GqlMenuRoleMapTree'),
        (0, typeorm_1.Index)(['childMenuRoleMapSeqNo', 'parentMenuRoleMapSeqNo'], {
            unique: true
        })
    ], MenuRoleMapTree);
    return MenuRoleMapTree;
}(common_entity_1.CommonEntity));
exports.MenuRoleMapTree = MenuRoleMapTree;
