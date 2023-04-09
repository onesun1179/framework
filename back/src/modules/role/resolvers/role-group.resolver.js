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
exports.RoleGroupResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var role_group_1 = require("../model/role-group");
var common_1 = require("@nestjs/common");
var role_1 = require("../model/role");
var save_role_group_request_1 = require("../model/request/save-role-group.request");
var typeorm_1 = require("typeorm");
var RoleGroupResolver = /** @class */ (function () {
    function RoleGroupResolver(roleService) {
        this.roleService = roleService;
        this.logger = new common_1.Logger(RoleGroupResolver_1.name);
    }
    RoleGroupResolver_1 = RoleGroupResolver;
    RoleGroupResolver.prototype.role = function (seqNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, role_group_1.RoleGroup.findOneBy({ seqNo: seqNo })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RoleGroupResolver.prototype.roles = function (_a) {
        var seqNo = _a.seqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, role_group_1.RoleGroup.findOne({
                            select: ['roles'],
                            relations: {
                                roles: true
                            },
                            where: {
                                seqNo: seqNo
                            }
                        }).then(function (r) { return r === null || r === void 0 ? void 0 : r.roles; })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    RoleGroupResolver.prototype.children = function (_a) {
        var seqNo = _a.seqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, role_group_1.RoleGroup.findOne({
                        select: ['children'],
                        relations: {
                            children: true
                        },
                        where: {
                            seqNo: seqNo
                        }
                    }).then(function (r) { return r === null || r === void 0 ? void 0 : r.children; })];
            });
        });
    };
    RoleGroupResolver.prototype.parent = function (_a) {
        var seqNo = _a.seqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, role_group_1.RoleGroup.findOne({
                        select: ['parent'],
                        relations: {
                            parent: true
                        },
                        where: {
                            seqNo: seqNo
                        }
                    }).then(function (r) { return r === null || r === void 0 ? void 0 : r.parent; })];
            });
        });
    };
    RoleGroupResolver.prototype.saveRoleGroup = function (saveRoleGroupRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var roleGroup, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, role_group_1.RoleGroup.create({
                            seqNo: saveRoleGroupRequest.seqNo,
                            name: saveRoleGroupRequest.name,
                            parentSeqNo: saveRoleGroupRequest.parentSeqNo
                        }).save()];
                    case 1:
                        roleGroup = _a.sent();
                        if (!(saveRoleGroupRequest.roleSeqNos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, role_1.Role.update({
                                seqNo: (0, typeorm_1.In)(saveRoleGroupRequest.roleSeqNos)
                            }, {
                                roleGroup: roleGroup
                            })];
                    case 2:
                        a = _a.sent();
                        this.logger.log(a);
                        _a.label = 3;
                    case 3:
                        if (!(saveRoleGroupRequest.childSeqNos.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, role_group_1.RoleGroup.update({
                                seqNo: (0, typeorm_1.In)(saveRoleGroupRequest.roleSeqNos)
                            }, {
                                parent: roleGroup
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, roleGroup];
                }
            });
        });
    };
    RoleGroupResolver.prototype.removeRoleGroup = function (seqNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, role_group_1.RoleGroup.findOneOrFail({
                            where: {
                                seqNo: seqNo
                            }
                        }).then(function (r) { return r.remove(); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var RoleGroupResolver_1;
    __decorate([
        (0, graphql_1.Query)(function () { return role_group_1.RoleGroup; }, {
            nullable: true
        }),
        __param(0, (0, graphql_1.Args)('seqNo', { type: function () { return graphql_1.Int; } }))
    ], RoleGroupResolver.prototype, "role");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [role_1.Role]; }, {
            defaultValue: []
        }),
        __param(0, (0, graphql_1.Parent)())
    ], RoleGroupResolver.prototype, "roles");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [role_group_1.RoleGroup]; }, {
            defaultValue: []
        }),
        __param(0, (0, graphql_1.Parent)())
    ], RoleGroupResolver.prototype, "children");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return role_group_1.RoleGroup; }, {
            nullable: true
        }),
        __param(0, (0, graphql_1.Parent)())
    ], RoleGroupResolver.prototype, "parent");
    __decorate([
        (0, graphql_1.Mutation)(function () { return role_group_1.RoleGroup; }),
        __param(0, (0, graphql_1.Args)('SaveRoleGroupRequest', {
            type: function () { return save_role_group_request_1.SaveRoleGroupRequest; }
        }))
    ], RoleGroupResolver.prototype, "saveRoleGroup");
    __decorate([
        (0, graphql_1.Mutation)(function () { return role_group_1.RoleGroup; }),
        __param(0, (0, graphql_1.Args)('seqNo', {
            type: function () { return graphql_1.Int; }
        }))
    ], RoleGroupResolver.prototype, "removeRoleGroup");
    RoleGroupResolver = RoleGroupResolver_1 = __decorate([
        (0, graphql_1.Resolver)(function () { return role_group_1.RoleGroup; })
    ], RoleGroupResolver);
    return RoleGroupResolver;
}());
exports.RoleGroupResolver = RoleGroupResolver;
