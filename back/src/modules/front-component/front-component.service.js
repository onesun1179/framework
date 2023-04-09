"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.FrontComponentService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var front_component_entity_1 = require("@modules/front-component/entities/front-component.entity");
var lodash_1 = require("lodash");
var all_front_component_entity_1 = require("@modules/front-component/entities/all-front-component.entity");
var role_front_component_map_1 = require("@modules/role/model/role-front-component-map");
var route_1 = require("@modules/route/models/route");
var FrontComponentService = /** @class */ (function () {
    function FrontComponentService(routeService, dataSource, frontComponentRepository, allFrontComponentRepository) {
        this.routeService = routeService;
        this.dataSource = dataSource;
        this.frontComponentRepository = frontComponentRepository;
        this.allFrontComponentRepository = allFrontComponentRepository;
    }
    FrontComponentService.prototype.saveAllFrontComponent = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataSource.manager.transaction(function (entityManager) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, entityManager.save(all_front_component_entity_1.AllFrontComponent.create({
                                        id: p.id,
                                        frontComponentId: p.frontComponentId
                                    }))];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            });
        });
    };
    FrontComponentService.prototype.saveFrontComponent = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataSource.manager.transaction(function (entityManager) { return __awaiter(_this, void 0, void 0, function () {
                        var frontComponent;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!p.routeSeqNos) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.routeService.updateFrontComponentByRoute(entityManager, p.routeSeqNos, p.id)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    if (!p.allFrontComponentIds) return [3 /*break*/, 4];
                                    return [4 /*yield*/, this.updateFrontComponentByAllFrontComponent(entityManager, p.allFrontComponentIds, p.id)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [4 /*yield*/, entityManager.save(front_component_entity_1.FrontComponent.create({
                                        id: p.id
                                    }))];
                                case 5:
                                    frontComponent = _a.sent();
                                    if (!!(0, lodash_1.isNil)(p.roleSeqNos)) return [3 /*break*/, 7];
                                    return [4 /*yield*/, this.saveRoleSeqNosToFrontComponent(entityManager, frontComponent.id, p.roleSeqNos)];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7:
                                    if (!!(0, lodash_1.isNil)(p.routeSeqNos)) return [3 /*break*/, 9];
                                    return [4 /*yield*/, this.saveRouteSeqNosToFrontComponent(entityManager, frontComponent.id, p.routeSeqNos)];
                                case 8:
                                    _a.sent();
                                    _a.label = 9;
                                case 9: return [2 /*return*/, frontComponent];
                            }
                        });
                    }); })];
            });
        });
    };
    FrontComponentService.prototype.saveRoleSeqNosToFrontComponent = function (entityManager, frontComponentId, roleSeqNos) {
        return __awaiter(this, void 0, void 0, function () {
            var foundRoleSeqNos, willDeleteRoleSeqNos, willSaveRoleSeqNos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, entityManager
                            .find(role_front_component_map_1.RoleFrontComponentMap, {
                            select: ['roleSeqNo'],
                            where: {
                                frontComponentId: frontComponentId
                            }
                        })
                            .then(function (r) { return r === null || r === void 0 ? void 0 : r.map(function (o) { return o.roleSeqNo; }); })];
                    case 1:
                        foundRoleSeqNos = _a.sent();
                        willDeleteRoleSeqNos = (0, lodash_1.difference)(foundRoleSeqNos, roleSeqNos);
                        willSaveRoleSeqNos = (0, lodash_1.difference)(roleSeqNos, willDeleteRoleSeqNos);
                        if (!(willDeleteRoleSeqNos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entityManager["delete"](role_front_component_map_1.RoleFrontComponentMap, {
                                roleSeqNo: (0, typeorm_1.In)(willDeleteRoleSeqNos)
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(willSaveRoleSeqNos.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, entityManager.save(willSaveRoleSeqNos.map(function (o) {
                                return role_front_component_map_1.RoleFrontComponentMap.create({
                                    roleSeqNo: o,
                                    frontComponentId: frontComponentId
                                });
                            }))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FrontComponentService.prototype.saveRouteSeqNosToFrontComponent = function (entityManager, frontComponentId, routeSeqNos) {
        return __awaiter(this, void 0, void 0, function () {
            var foundRouteSeqNos, willDeleteRouteSeqNos, willSaveRouteSeqNos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, entityManager
                            .find(route_1.Route, {
                            select: ['seqNo'],
                            where: {
                                frontComponentId: frontComponentId
                            }
                        })
                            .then(function (r) { return r === null || r === void 0 ? void 0 : r.map(function (o) { return o.seqNo; }); })];
                    case 1:
                        foundRouteSeqNos = _a.sent();
                        willDeleteRouteSeqNos = (0, lodash_1.difference)(foundRouteSeqNos, routeSeqNos);
                        willSaveRouteSeqNos = (0, lodash_1.difference)(routeSeqNos, willDeleteRouteSeqNos);
                        if (!(willDeleteRouteSeqNos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entityManager.update(route_1.Route, {
                                seqNo: (0, typeorm_1.In)(willDeleteRouteSeqNos)
                            }, {
                                frontComponentId: null
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(willSaveRouteSeqNos.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, entityManager.update(route_1.Route, {
                                seqNo: (0, typeorm_1.In)(willSaveRouteSeqNos)
                            }, {
                                frontComponentId: frontComponentId
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FrontComponentService.prototype.updateFrontComponentByAllFrontComponent = function (entityManager, allFrontComponentIds, frontComponentId) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, willDeleteIds, willUpdateIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, entityManager
                            .find(all_front_component_entity_1.AllFrontComponent, {
                            select: ['id'],
                            where: {
                                frontComponentId: frontComponentId
                            }
                        })
                            .then(function (r) { return r.map(function (o) { return o.id; }); })];
                    case 1:
                        ids = _a.sent();
                        willDeleteIds = (0, lodash_1.difference)(ids, allFrontComponentIds);
                        willUpdateIds = (0, lodash_1.difference)(allFrontComponentIds, ids);
                        if (!(willDeleteIds.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entityManager.update(all_front_component_entity_1.AllFrontComponent, {
                                seqNo: (0, typeorm_1.In)(willDeleteIds)
                            }, {
                                frontComponentId: null
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(willUpdateIds.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, entityManager.update(all_front_component_entity_1.AllFrontComponent, {
                                seqNo: (0, typeorm_1.In)(willUpdateIds)
                            }, {
                                frontComponentId: frontComponentId
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FrontComponentService = __decorate([
        (0, common_1.Injectable)()
    ], FrontComponentService);
    return FrontComponentService;
}());
exports.FrontComponentService = FrontComponentService;
