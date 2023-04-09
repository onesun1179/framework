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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MenuResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var common_1 = require("@nestjs/common");
var menu_1 = require("../model/menu");
var role_1 = require("@modules/role/model/role");
var icon_1 = require("@modules/icon/model/icon");
var gql_auth_guard_1 = require("../../../auth/guard/gql-auth.guard");
var CurrentUser_1 = require("@common/docorator/CurrentUser");
var menu_role_map_1 = require("@modules/menu/model/menu-role-map");
var typeorm_1 = require("@nestjs/typeorm");
var lodash_1 = require("lodash");
var route_1 = require("@modules/route/models/route");
var menus_1 = require("@modules/menu/model/dto/menus");
var paging_input_1 = require("@common/dto/inputs/paging.input");
var menus_request_1 = require("@modules/menu/model/requests/menus.request");
var util_paging_1 = require("@common/utils/util.paging");
var builder_pattern_1 = require("builder-pattern");
var MenuResolver = /** @class */ (function () {
    function MenuResolver(menuService, dataSource) {
        this.menuService = menuService;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(MenuResolver_1.name);
    }
    MenuResolver_1 = MenuResolver;
    MenuResolver.prototype.message = function (seqNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataSource
                            .createQueryBuilder(menu_1.Menu, 'Menu')
                            .where('Menu.seqNo = :seqNo', {
                            seqNo: seqNo
                        })
                            .getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MenuResolver.prototype.roles = function (_a) {
        var seqNo = _a.seqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dataSource
                            .createQueryBuilder(role_1.Role, 'role')
                            .innerJoin('role.menuRoleMaps', 'menuRoleMaps', 'menuRoleMaps.menuSeqNo = :menuSeqNo', {
                            menuSeqNo: seqNo
                        })
                            .getMany()];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    MenuResolver.prototype.icon = function (_a) {
        var iconSeqNo = _a.iconSeqNo;
        if (!(0, lodash_1.isNil)(iconSeqNo)) {
            return this.dataSource
                .createQueryBuilder(icon_1.Icon, 'icon')
                .where('icon.seqNo = :iconSeqNo', {
                iconSeqNo: iconSeqNo
            })
                .getOne();
        }
        return null;
    };
    MenuResolver.prototype.children = function (_a, _b) {
        var seqNo = _a.seqNo;
        var roleSeqNo = _b.roleSeqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.dataSource
                        .createQueryBuilder(menu_1.Menu, 'm')
                        .innerJoin('m.menuRoleMaps', 'mr')
                        .innerJoin('mr.children', 'mrp')
                        .where("mr.roleSeqNo = :roleSeqNo", {
                        roleSeqNo: roleSeqNo
                    })
                        .andWhere(function (qr) {
                        return "mrp.parentMenuRoleMapSeqNo IN (".concat(qr
                            .createQueryBuilder()
                            .select("mrm.seqNo")
                            .from(menu_role_map_1.MenuRoleMap, "mrm")
                            .where("mrm.menuSeqNo = ".concat(seqNo))
                            .getQuery(), ")");
                    })
                        .getMany()];
            });
        });
    };
    MenuResolver.prototype.route = function (_a, _b) {
        var routeSeqNo = _a.routeSeqNo;
        var roleSeqNo = _b.roleSeqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.dataSource
                            .createQueryBuilder(route_1.Route, 'r')
                            .where("r.seqNo = :routeSeqNo", {
                            routeSeqNo: routeSeqNo
                        })
                            .getOne()];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    MenuResolver.prototype.menus = function (paging, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataSource.transaction(function (entityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _a = builder_pattern_1.Builder;
                                        _b = [menus_1.Menus];
                                        return [4 /*yield*/, util_paging_1.UtilPaging.getRes(paging, entityManager.createQueryBuilder(menu_1.Menu, 'm'))];
                                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()])).build()];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var MenuResolver_1;
    __decorate([
        (0, graphql_1.Query)(function () { return menu_1.Menu; }),
        __param(0, (0, graphql_1.Args)('seqNo', {
            type: function () { return graphql_1.Int; }
        }))
    ], MenuResolver.prototype, "message");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [role_1.Role]; }, {
            defaultValue: []
        }),
        __param(0, (0, graphql_1.Parent)())
    ], MenuResolver.prototype, "roles");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return icon_1.Icon; }, {
            nullable: true
        }),
        __param(0, (0, graphql_1.Parent)())
    ], MenuResolver.prototype, "icon");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [menu_1.Menu]; }, {
            defaultValue: []
        }),
        __param(0, (0, graphql_1.Parent)()),
        __param(1, (0, CurrentUser_1.CurrentUser)())
    ], MenuResolver.prototype, "children");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return route_1.Route; }, {
            nullable: true
        }),
        __param(0, (0, graphql_1.Parent)()),
        __param(1, (0, CurrentUser_1.CurrentUser)())
    ], MenuResolver.prototype, "route");
    __decorate([
        (0, graphql_1.Query)(function () { return menus_1.Menus; }),
        __param(0, (0, graphql_1.Args)('paging', {
            type: function () { return paging_input_1.PagingInput; }
        })),
        __param(1, (0, graphql_1.Args)('param', {
            type: function () { return menus_request_1.MenusRequest; },
            nullable: true
        }))
    ], MenuResolver.prototype, "menus");
    MenuResolver = MenuResolver_1 = __decorate([
        (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
        (0, graphql_1.Resolver)(function () { return menu_1.Menu; }),
        __param(1, (0, typeorm_1.InjectDataSource)())
    ], MenuResolver);
    return MenuResolver;
}());
exports.MenuResolver = MenuResolver;
