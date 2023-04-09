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
exports.RouteResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var route_1 = require("../models/route");
var common_1 = require("@nestjs/common");
var role_1 = require("@modules/role/model/role");
var typeorm_1 = require("@nestjs/typeorm");
var role_route_map_1 = require("@modules/role/model/role-route-map");
var route_request_1 = require("@modules/route/models/route.request");
var route_tree_1 = require("@modules/route/models/route-tree");
var paged_routes_1 = require("@modules/route/models/paged-routes");
var paging_input_1 = require("@common/dto/inputs/paging.input");
var front_component_entity_1 = require("@modules/front-component/entities/front-component.entity");
var RouteResolver = /** @class */ (function () {
    function RouteResolver(routeService, dataSource) {
        this.routeService = routeService;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(RouteResolver_1.name);
    }
    RouteResolver_1 = RouteResolver;
    /**************************************
     *              QUERY
     ***************************************/
    RouteResolver.prototype.route = function (seqNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataSource.manager.findOne(route_1.Route, {
                            where: {
                                seqNo: seqNo
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RouteResolver.prototype.routes = function (paging, req) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataSource.transaction(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, this.routeService.getPaging(e, paging, req)];
                        });
                    }); })];
            });
        });
    };
    /**************************************
     *           RESOLVE_FIELD
     ***************************************/
    RouteResolver.prototype.children = function (_a) {
        var seqNo = _a.seqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dataSource.manager.find(route_1.Route, {
                            where: {
                                parentSeqNo: seqNo
                            }
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    RouteResolver.prototype.parent = function (_a) {
        var parentSeqNo = _a.parentSeqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dataSource.manager.findOne(route_1.Route, {
                            where: {
                                seqNo: parentSeqNo
                            }
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    RouteResolver.prototype.frontComponent = function (_a) {
        var frontComponentId = _a.frontComponentId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dataSource.manager.findOne(front_component_entity_1.FrontComponent, {
                            where: {
                                id: frontComponentId
                            }
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    RouteResolver.prototype.roles = function (_a) {
        var seqNo = _a.seqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dataSource
                            .createQueryBuilder(role_1.Role, 'r')
                            .innerJoinAndSelect(role_route_map_1.RoleRouteMap, 'rrm')
                            .select('r')
                            .where('rrm.routeSeqNo = :seqNo', {
                            seqNo: seqNo
                        })
                            .getMany()];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    RouteResolver.prototype.routeTree = function (_a) {
        var seqNo = _a.seqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dataSource
                            .query("\n              WITH RECURSIVE FullPath (full_path, seq_no, parent_seq_no, depth)\n                                 AS (\n                                    SELECT path AS full_path, seq_no, parent_seq_no, 0 AS depth\n                                      FROM route\n                                     WHERE parent_seq_no IS NULL\n\n                                     UNION ALL\n\n                                    SELECT CONCAT(f.full_path,\n                                                  IF(ISNULL(f.parent_seq_no) OR INSTR(r.path, '/') = 1, '', '/'),\n                                                  r.path) AS full_path\n                                         , r.seq_no\n                                         , r.parent_seq_no\n                                         , depth + 1      AS depth\n                                      FROM FullPath f\n                                         , route r\n                                     WHERE r.parent_seq_no = f.seq_no )\n            SELECT full_path AS fullPath\n                 , depth\n              FROM FullPath\n             WHERE seq_no = ".concat(seqNo, "\n             LIMIT 1\n        "))
                            .then(function (r) { return r[0]; })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**************************************
     *           MUTATION
     ***************************************/
    RouteResolver.prototype.insertRoute = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataSource.transaction(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, this.routeService.save(e, req)];
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RouteResolver.prototype.updateRoute = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataSource.transaction(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.routeService.hasSeqNo(e, req.seqNo)];
                                    case 1:
                                        if (_a.sent()) {
                                            return [2 /*return*/, this.routeService.save(e, req)];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var RouteResolver_1;
    __decorate([
        (0, graphql_1.Query)(function () { return route_1.Route; }),
        __param(0, (0, graphql_1.Args)('seqNo', {
            type: function () { return graphql_1.Int; }
        }))
    ], RouteResolver.prototype, "route");
    __decorate([
        (0, graphql_1.Query)(function () { return paged_routes_1.PagedRoutes; }),
        __param(0, (0, graphql_1.Args)('paging', {
            type: function () { return paging_input_1.PagingInput; },
            nullable: true
        })),
        __param(1, (0, graphql_1.Args)('request', {
            type: function () { return route_request_1.RoutesRequest; },
            nullable: true
        }))
    ], RouteResolver.prototype, "routes");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [route_1.Route]; }, {
            defaultValue: []
        }),
        __param(0, (0, graphql_1.Parent)())
    ], RouteResolver.prototype, "children");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return route_1.Route; }),
        __param(0, (0, graphql_1.Parent)())
    ], RouteResolver.prototype, "parent");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return front_component_entity_1.FrontComponent; }),
        __param(0, (0, graphql_1.Parent)())
    ], RouteResolver.prototype, "frontComponent");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [role_1.Role]; }),
        __param(0, (0, graphql_1.Parent)())
    ], RouteResolver.prototype, "roles");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return route_tree_1.RouteTree; }),
        __param(0, (0, graphql_1.Parent)())
    ], RouteResolver.prototype, "routeTree");
    __decorate([
        (0, graphql_1.Mutation)(function () { return route_1.Route; }),
        __param(0, (0, graphql_1.Args)('req', {
            type: function () { return route_request_1.InsertRouteRequest; }
        }))
    ], RouteResolver.prototype, "insertRoute");
    __decorate([
        (0, graphql_1.Mutation)(function () { return route_1.Route; }),
        __param(0, (0, graphql_1.Args)('req', {
            type: function () { return route_request_1.UpdateRouteRequest; }
        }))
    ], RouteResolver.prototype, "updateRoute");
    RouteResolver = RouteResolver_1 = __decorate([
        (0, graphql_1.Resolver)(function () { return route_1.Route; }),
        __param(1, (0, typeorm_1.InjectDataSource)())
    ], RouteResolver);
    return RouteResolver;
}());
exports.RouteResolver = RouteResolver;
