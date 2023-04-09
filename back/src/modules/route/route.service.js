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
exports.RouteService = void 0;
var common_1 = require("@nestjs/common");
var route_1 = require("./models/route");
var typeorm_1 = require("typeorm");
var lodash_1 = require("lodash");
var typeorm_2 = require("@nestjs/typeorm");
var route_request_1 = require("@modules/route/models/route.request");
var util_paging_1 = require("@common/utils/util.paging");
var paged_messages_1 = require("@modules/message/dto/output/paged-messages");
var RouteService = /** @class */ (function () {
    function RouteService(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(RouteService_1.name);
    }
    RouteService_1 = RouteService;
    RouteService.prototype.getPaging = function (entityManager, pagingRequest, p) {
        return __awaiter(this, void 0, void 0, function () {
            var where;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        where = {};
                        p.rootYn && (where.parentSeqNo = (0, typeorm_1.IsNull)());
                        p.seqNos && (where.seqNo = (0, typeorm_1.In)(p.seqNos));
                        p.path && (where.path = (0, typeorm_1.Like)("%".concat(p.path, "%")));
                        p.parentSeqNo && (where.parentSeqNo = p.parentSeqNo);
                        return [4 /*yield*/, util_paging_1.UtilPaging.getRes(pagingRequest, entityManager.createQueryBuilder(route_1.Route, 'r').where(where), paged_messages_1.PagedMessages)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RouteService.prototype.save = function (e, p) {
        return __awaiter(this, void 0, void 0, function () {
            var route, childSeqNos, willDelChildSeqNos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, e.save(route_1.Route.create({
                            seqNo: p instanceof route_request_1.UpdateRouteRequest ? p.seqNo : undefined,
                            path: p.path,
                            parentSeqNo: p.parentSeqNo,
                            frontComponentId: p.frontComponentId
                        }))];
                    case 1:
                        route = _a.sent();
                        if (!p.childSeqNos) return [3 /*break*/, 6];
                        return [4 /*yield*/, e
                                .find(route_1.Route, {
                                select: ['seqNo'],
                                where: {
                                    parentSeqNo: route.seqNo
                                }
                            })
                                .then(function (r) { return r.map(function (o) { return o.seqNo; }); })];
                    case 2:
                        childSeqNos = _a.sent();
                        willDelChildSeqNos = (0, lodash_1.difference)(childSeqNos, p.childSeqNos);
                        if (!(willDelChildSeqNos.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, e.update(route_1.Route, {
                                seqNo: (0, typeorm_1.In)(willDelChildSeqNos)
                            }, {
                                parentSeqNo: null
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, e.update(route_1.Route, {
                            seqNo: (0, typeorm_1.In)(p.childSeqNos)
                        }, {
                            parentSeqNo: route.seqNo
                        })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, route];
                }
            });
        });
    };
    RouteService.prototype.hasSeqNo = function (e, seqNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, e
                            .countBy(route_1.Route, {
                            seqNo: seqNo
                        })
                            .then(function (r) { return r > 0; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RouteService.prototype.updateFrontComponentByRoute = function (entityManager, routeSeqNos, frontComponentId) {
        return __awaiter(this, void 0, void 0, function () {
            var seqNos, willDeleteSeqNos, willUpdateSeqNos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, entityManager
                            .find(route_1.Route, {
                            select: ['seqNo'],
                            where: {
                                frontComponentId: frontComponentId
                            }
                        })
                            .then(function (r) { return r.map(function (o) { return o.seqNo; }); })];
                    case 1:
                        seqNos = _a.sent();
                        willDeleteSeqNos = (0, lodash_1.difference)(seqNos, routeSeqNos);
                        willUpdateSeqNos = (0, lodash_1.difference)(routeSeqNos, seqNos);
                        if (!(willDeleteSeqNos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entityManager.update(route_1.Route, {
                                seqNo: (0, typeorm_1.In)(willDeleteSeqNos)
                            }, {
                                frontComponentId: null
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(willUpdateSeqNos.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, entityManager.update(route_1.Route, {
                                seqNo: (0, typeorm_1.In)(willUpdateSeqNos)
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
    var RouteService_1;
    RouteService = RouteService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_2.InjectDataSource)())
    ], RouteService);
    return RouteService;
}());
exports.RouteService = RouteService;
