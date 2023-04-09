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
exports.RoleGroup = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var role_1 = require("./role");
var graphql_1 = require("@nestjs/graphql");
var RoleGroup = /** @class */ (function (_super) {
    __extends(RoleGroup, _super);
    function RoleGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleGroup_1 = RoleGroup;
    var RoleGroup_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], RoleGroup.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false
        }),
        (0, graphql_1.Field)({
            nullable: false
        })
    ], RoleGroup.prototype, "name");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return role_1.Role; }, function (o) { return o.roleGroup; }, {
            nullable: true
        })
    ], RoleGroup.prototype, "roles");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return RoleGroup_1; }, function (o) { return o.parent; })
    ], RoleGroup.prototype, "children");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            nullable: true
        })
    ], RoleGroup.prototype, "parentSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return RoleGroup_1; }, function (o) { return o.children; }, {
            nullable: true
        }),
        (0, typeorm_1.JoinColumn)({
            name: 'parent_seq_no'
        })
    ], RoleGroup.prototype, "parent");
    RoleGroup = RoleGroup_1 = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlRoleGroup')
    ], RoleGroup);
    return RoleGroup;
}(common_entity_1.CommonEntity));
exports.RoleGroup = RoleGroup;
