"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.MenuResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var common_1 = require("@nestjs/common");
var Menu_1 = require("../model/Menu");
var Role_1 = require("../../role/model/Role");
var Icon_1 = require("../../icon/model/Icon");
var MenuResolver = /** @class */ (function () {
    function MenuResolver(menuService) {
        this.menuService = menuService;
        this.logger = new common_1.Logger(MenuResolver_1.name);
    }
    MenuResolver_1 = MenuResolver;
    MenuResolver.prototype.message = function (seqNo) {
        return this.menuService.getMenuRepository().findOneBy({
            seqNo: seqNo
        });
    };
    MenuResolver.prototype.children = function (_a) {
        var seqNo = _a.seqNo;
        return this.menuService
            .getMenuRepository()
            .findOne({
            select: ['childMenuTrees'],
            relations: {
                childMenuTrees: true
            },
            where: {
                seqNo: seqNo
            }
        })
            .then(function (r) { return r === null || r === void 0 ? void 0 : r.childMenuTrees.map(function (o) { return o.childMenu; }); });
    };
    MenuResolver.prototype.parents = function (_a) {
        var seqNo = _a.seqNo;
        return this.menuService
            .getMenuRepository()
            .findOne({
            select: ['parentMenuTrees'],
            relations: {
                parentMenuTrees: true
            },
            where: {
                seqNo: seqNo
            }
        })
            .then(function (r) { return r === null || r === void 0 ? void 0 : r.parentMenuTrees.map(function (o) { return o.parentMenu; }); });
    };
    MenuResolver.prototype.roles = function (_a) {
        var seqNo = _a.seqNo;
        return this.menuService
            .getMenuRepository()
            .findOne({
            select: ['menusRoles'],
            relations: {
                menusRoles: true
            },
            where: {
                seqNo: seqNo
            }
        })
            .then(function (r) { return r === null || r === void 0 ? void 0 : r.menusRoles.map(function (o) { return o.role; }); });
    };
    MenuResolver.prototype.icon = function (_a) {
        var seqNo = _a.seqNo;
        return this.menuService
            .getMenuRepository()
            .findOne({
            select: ['icon'],
            relations: {
                icon: true
            },
            where: {
                seqNo: seqNo
            }
        })
            .then(function (r) { return r === null || r === void 0 ? void 0 : r.icon; });
    };
    var MenuResolver_1;
    __decorate([
        (0, graphql_1.Query)(function () { return Menu_1.Menu; }),
        __param(0, (0, graphql_1.Args)('seqNo', {
            type: function () { return graphql_1.Int; }
        }))
    ], MenuResolver.prototype, "message");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [Menu_1.Menu]; }, {}),
        __param(0, (0, graphql_1.Parent)())
    ], MenuResolver.prototype, "children");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [Menu_1.Menu]; }, {}),
        __param(0, (0, graphql_1.Parent)())
    ], MenuResolver.prototype, "parents");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [Role_1.Role]; }, {}),
        __param(0, (0, graphql_1.Parent)())
    ], MenuResolver.prototype, "roles");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return Icon_1.Icon; }),
        __param(0, (0, graphql_1.Parent)())
    ], MenuResolver.prototype, "icon");
    MenuResolver = MenuResolver_1 = __decorate([
        (0, graphql_1.Resolver)(function () { return Menu_1.Menu; })
    ], MenuResolver);
    return MenuResolver;
}());
exports.MenuResolver = MenuResolver;
