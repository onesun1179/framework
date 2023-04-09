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
exports.Menu = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var menu_role_map_1 = require("./menu-role-map");
var graphql_1 = require("@nestjs/graphql");
var icon_1 = require("@modules/icon/model/icon");
var route_1 = require("@modules/route/models/route");
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], Menu.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)()
    ], Menu.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            nullable: true
        })
    ], Menu.prototype, "iconSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return icon_1.Icon; }, function (o) { return o.menus; }, {
            nullable: true
        }),
        (0, typeorm_1.JoinColumn)({
            name: 'icon_seq_no'
        })
    ], Menu.prototype, "icon");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return menu_role_map_1.MenuRoleMap; }, function (o) { return o.menu; })
    ], Menu.prototype, "menuRoleMaps");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return route_1.Route; }, function (o) { return o.menus; }),
        (0, typeorm_1.JoinColumn)({
            name: 'route_seq_no'
        })
    ], Menu.prototype, "route");
    __decorate([
        (0, typeorm_1.Column)()
    ], Menu.prototype, "routeSeqNo");
    Menu = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlMenu')
    ], Menu);
    return Menu;
}(common_entity_1.CommonEntity));
exports.Menu = Menu;
