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
exports.MessageGroupResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var message_group_1 = require("../entities/message-group");
var message_1 = require("../entities/message");
var typeorm_1 = require("@nestjs/typeorm");
var paged_message_groups_1 = require("@modules/message/dto/output/paged-message-groups");
var paging_input_1 = require("@common/dto/inputs/paging.input");
var message_groups_input_1 = require("@modules/message/dto/input/message-groups.input");
var update_message_group_input_1 = require("@modules/message/dto/input/update-message-group.input");
var insert_message_group_input_1 = require("@modules/message/dto/input/insert-message-group.input");
var common_1 = require("@nestjs/common");
var GqlError_1 = require("@common/errors/GqlError");
var msg_code_1 = require("@modules/message/dto/msg-code");
var MessageGroupResolver = /** @class */ (function () {
    function MessageGroupResolver(messageService, messageGroupService, messageGroupRepository, dataSource) {
        this.messageService = messageService;
        this.messageGroupService = messageGroupService;
        this.messageGroupRepository = messageGroupRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(MessageGroupResolver_1.name);
    }
    MessageGroupResolver_1 = MessageGroupResolver;
    /**************************************
     *              QUERY
     ***************************************/
    MessageGroupResolver.prototype.messageGroup = function (code) {
        return message_group_1.MessageGroup.findOneBy({
            code: code
        });
    };
    MessageGroupResolver.prototype.messageGroups = function (paging, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageGroupRepository.paging(paging, req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**************************************
     *           RESOLVE_FIELD
     ***************************************/
    MessageGroupResolver.prototype.messages = function (_a) {
        var _this = this;
        var code = _a.code;
        return this.dataSource.transaction(function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, e
                            .createQueryBuilder(message_1.Message, 'm')
                            .where("m.groupCode = :code", {
                            code: code
                        })
                            .getMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    };
    /**************************************
     *           MUTATION
     ***************************************/
    MessageGroupResolver.prototype.updateMessageGroup = function (updateMessageGroupInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageGroupRepository.hasRow(updateMessageGroupInput.code)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, this.messageGroupRepository.saveCustom(updateMessageGroupInput)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    MessageGroupResolver.prototype.insertMessageGroup = function (insertMessageGroupInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageGroupRepository.hasRow(insertMessageGroupInput.code)];
                    case 1:
                        if (_a.sent()) {
                            throw new GqlError_1.GqlError(new msg_code_1.MsgCode('E', '0009'));
                        }
                        else {
                            return [2 /*return*/, this.messageGroupRepository.saveCustom(insertMessageGroupInput)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    var MessageGroupResolver_1;
    __decorate([
        (0, graphql_1.Query)(function () { return message_group_1.MessageGroup; }),
        __param(0, (0, graphql_1.Args)('code', {
            type: function () { return String; }
        }))
    ], MessageGroupResolver.prototype, "messageGroup");
    __decorate([
        (0, graphql_1.Query)(function () { return paged_message_groups_1.PagedMessageGroups; }),
        __param(0, (0, graphql_1.Args)('paging', {
            type: function () { return paging_input_1.PagingInput; },
            nullable: true
        })),
        __param(1, (0, graphql_1.Args)('request', {
            type: function () { return message_groups_input_1.MessageGroupsInput; },
            nullable: true
        }))
    ], MessageGroupResolver.prototype, "messageGroups");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [message_1.Message]; }),
        __param(0, (0, graphql_1.Parent)())
    ], MessageGroupResolver.prototype, "messages");
    __decorate([
        (0, graphql_1.Mutation)(function () { return message_group_1.MessageGroup; }, {
            nullable: true
        }),
        __param(0, (0, graphql_1.Args)('updateMessageGroupInput', {
            type: function () { return update_message_group_input_1.UpdateMessageGroupInput; }
        }))
    ], MessageGroupResolver.prototype, "updateMessageGroup");
    __decorate([
        (0, graphql_1.Mutation)(function () { return message_group_1.MessageGroup; }),
        __param(0, (0, graphql_1.Args)('insertMessageGroupInput', {
            type: function () { return insert_message_group_input_1.InsertMessageGroupInput; }
        }))
    ], MessageGroupResolver.prototype, "insertMessageGroup");
    MessageGroupResolver = MessageGroupResolver_1 = __decorate([
        (0, graphql_1.Resolver)(function () { return message_group_1.MessageGroup; }),
        __param(3, (0, typeorm_1.InjectDataSource)())
    ], MessageGroupResolver);
    return MessageGroupResolver;
}());
exports.MessageGroupResolver = MessageGroupResolver;
