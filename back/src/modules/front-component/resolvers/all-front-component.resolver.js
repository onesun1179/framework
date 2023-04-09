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
exports.AllFrontComponentResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var front_component_entity_1 = require("@modules/front-component/entities/front-component.entity");
var all_front_component_entity_1 = require("@modules/front-component/entities/all-front-component.entity");
var common_1 = require("@nestjs/common");
var gql_auth_guard_1 = require("../../../auth/guard/gql-auth.guard");
var CurrentUser_1 = require("@common/docorator/CurrentUser");
var typeorm_1 = require("@nestjs/typeorm");
var insert_all_front_component_input_1 = require("@modules/front-component/dto/insert-all-front-component.input");
var update_all_front_component_input_1 = require("@modules/front-component/dto/update-all-front-component.input");
var AllFrontComponentResolver = /** @class */ (function () {
    function AllFrontComponentResolver(frontComponentService, dataSource) {
        this.frontComponentService = frontComponentService;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(AllFrontComponentResolver_1.name);
    }
    AllFrontComponentResolver_1 = AllFrontComponentResolver;
    /**************************************
     *              QUERY
     ***************************************/
    AllFrontComponentResolver.prototype.allFrontComponent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, all_front_component_entity_1.AllFrontComponent.findOneBy({
                            id: id
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AllFrontComponentResolver.prototype.allFrontComponentByCurrentUserAndFrontComponentId = function (frontComponentId, _a) {
        var roleSeqNo = _a.roleSeqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.dataSource
                        .createQueryBuilder(all_front_component_entity_1.AllFrontComponent, 'afc')
                        .innerJoin('afc.roleFrontComponentMaps', 'rfc', '')
                        .where("rfc.roleSeqNo = :roleSeqNo", {
                        roleSeqNo: roleSeqNo
                    })
                        .where('afc.frontComponentId = :frontComponentId', {
                        frontComponentId: frontComponentId
                    })
                        .getOne()];
            });
        });
    };
    /**************************************
     *           RESOLVE_FIELD
     ***************************************/
    AllFrontComponentResolver.prototype.frontComponent = function (_a) {
        var frontComponentId = _a.frontComponentId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, front_component_entity_1.FrontComponent.findOneBy({
                            id: frontComponentId
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**************************************
     *           MUTATION
     ***************************************/
    AllFrontComponentResolver.prototype.insertAllFrontComponent = function (insertAllFrontComponentInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.frontComponentService.saveAllFrontComponent(insertAllFrontComponentInput)];
            });
        });
    };
    AllFrontComponentResolver.prototype.updateAllFrontComponent = function (updateAllFrontComponentInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.frontComponentService.saveAllFrontComponent(updateAllFrontComponentInput)];
            });
        });
    };
    var AllFrontComponentResolver_1;
    __decorate([
        (0, graphql_1.Query)(function () { return all_front_component_entity_1.AllFrontComponent; }, {
            nullable: true
        }),
        __param(0, (0, graphql_1.Args)('id', {
            type: function () { return String; }
        }))
    ], AllFrontComponentResolver.prototype, "allFrontComponent");
    __decorate([
        (0, graphql_1.Query)(function () { return all_front_component_entity_1.AllFrontComponent; }, {
            nullable: true
        }),
        __param(0, (0, graphql_1.Args)('frontComponentId', {
            type: function () { return String; }
        })),
        __param(1, (0, CurrentUser_1.CurrentUser)())
    ], AllFrontComponentResolver.prototype, "allFrontComponentByCurrentUserAndFrontComponentId");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return front_component_entity_1.FrontComponent; }),
        __param(0, (0, graphql_1.Parent)())
    ], AllFrontComponentResolver.prototype, "frontComponent");
    __decorate([
        (0, graphql_1.Mutation)(function () { return all_front_component_entity_1.AllFrontComponent; }),
        __param(0, (0, graphql_1.Args)('insertAllFrontComponentInput', {
            type: function () { return insert_all_front_component_input_1.InsertAllFrontComponentInput; }
        }))
    ], AllFrontComponentResolver.prototype, "insertAllFrontComponent");
    __decorate([
        (0, graphql_1.Mutation)(function () { return all_front_component_entity_1.AllFrontComponent; }),
        __param(0, (0, graphql_1.Args)('updateAllFrontComponentInput', {
            type: function () { return update_all_front_component_input_1.UpdateAllFrontComponentInput; }
        }))
    ], AllFrontComponentResolver.prototype, "updateAllFrontComponent");
    AllFrontComponentResolver = AllFrontComponentResolver_1 = __decorate([
        (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
        (0, graphql_1.Resolver)(function () { return all_front_component_entity_1.AllFrontComponent; }),
        __param(1, (0, typeorm_1.InjectDataSource)())
    ], AllFrontComponentResolver);
    return AllFrontComponentResolver;
}());
exports.AllFrontComponentResolver = AllFrontComponentResolver;
