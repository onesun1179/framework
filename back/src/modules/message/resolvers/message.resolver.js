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
exports.MessageResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var message_1 = require("../entities/message");
var common_1 = require("@nestjs/common");
var message_group_1 = require("../entities/message-group");
var messages_input_1 = require("@modules/message/dto/input/messages.input");
var paging_input_1 = require("@common/dto/inputs/paging.input");
var paged_messages_1 = require("@modules/message/dto/output/paged-messages");
var update_message_input_1 = require("@modules/message/dto/input/update-message.input");
var insert_message_input_1 = require("@modules/message/dto/input/insert-message.input");
var MessageResolver = /** @class */ (function () {
    function MessageResolver(messageService, dataSource, messageRepository) {
        this.messageService = messageService;
        this.dataSource = dataSource;
        this.messageRepository = messageRepository;
        this.logger = new common_1.Logger(MessageResolver_1.name);
    }
    MessageResolver_1 = MessageResolver;
    /**************************************
     *              QUERY
     ***************************************/
    MessageResolver.prototype.message = function (seqNo) {
        return message_1.Message.findOneBy({
            seqNo: seqNo
        });
    };
    MessageResolver.prototype.messages = function (paging, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log({
                            paging: paging,
                            req: req
                        });
                        return [4 /*yield*/, this.messageRepository.paging(paging, req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**************************************
     *           RESOLVE_FIELD
     ***************************************/
    MessageResolver.prototype.group = function (_a) {
        var code = _a.code;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dataSource.transaction(function (entityManager) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, entityManager
                                            .createQueryBuilder(message_group_1.MessageGroup, 'mg')
                                            .where("mg.code = :code", {
                                            code: code
                                        })
                                            .getOne()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**************************************
     *           MUTATION
     ***************************************/
    MessageResolver.prototype.updateMessage = function (updateMessageInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageRepository.hasRow(updateMessageInput.seqNo)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, this.messageRepository.saveCustom(updateMessageInput)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    MessageResolver.prototype.insertMessage = function (insertMessageInput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageRepository.saveCustom(insertMessageInput)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MessageResolver.prototype.deleteMessages = function (seqNos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.messageRepository["delete"](seqNos)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    var MessageResolver_1;
    __decorate([
        (0, graphql_1.Query)(function () { return message_1.Message; }, {
            nullable: true
        }),
        __param(0, (0, graphql_1.Args)('seqNo', {
            type: function () { return graphql_1.Int; }
        }))
    ], MessageResolver.prototype, "message");
    __decorate([
        (0, graphql_1.Query)(function () { return paged_messages_1.PagedMessages; }),
        __param(0, (0, graphql_1.Args)('paging', {
            type: function () { return paging_input_1.PagingInput; },
            nullable: true
        })),
        __param(1, (0, graphql_1.Args)('request', {
            type: function () { return messages_input_1.MessagesInput; },
            nullable: true
        }))
    ], MessageResolver.prototype, "messages");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return message_group_1.MessageGroup; }),
        __param(0, (0, graphql_1.Parent)())
    ], MessageResolver.prototype, "group");
    __decorate([
        (0, graphql_1.Mutation)(function () { return message_1.Message; }),
        __param(0, (0, graphql_1.Args)('updateMessageInput', {
            type: function () { return update_message_input_1.UpdateMessageInput; }
        }))
    ], MessageResolver.prototype, "updateMessage");
    __decorate([
        (0, graphql_1.Mutation)(function () { return message_1.Message; }),
        __param(0, (0, graphql_1.Args)('insertMessageInput', {
            type: function () { return insert_message_input_1.InsertMessageInput; }
        }))
    ], MessageResolver.prototype, "insertMessage");
    __decorate([
        (0, graphql_1.Mutation)(function () { return Boolean; }),
        __param(0, (0, graphql_1.Args)('seqNos', {
            type: function () { return [graphql_1.Int]; }
        }))
    ], MessageResolver.prototype, "deleteMessages");
    MessageResolver = MessageResolver_1 = __decorate([
        (0, graphql_1.Resolver)(function () { return message_1.Message; })
    ], MessageResolver);
    return MessageResolver;
}());
exports.MessageResolver = MessageResolver;
