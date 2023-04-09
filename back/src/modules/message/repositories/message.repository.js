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
exports.MessageRepository = void 0;
var message_1 = require("@modules/message/entities/message");
var typeorm_1 = require("typeorm");
var util_paging_1 = require("@common/utils/util.paging");
var paged_messages_1 = require("@modules/message/dto/output/paged-messages");
var message_group_repository_1 = require("@modules/message/repositories/message-group.repository");
var update_message_input_1 = require("@modules/message/dto/input/update-message.input");
var cache_manager_1 = require("@nestjs/cache-manager");
var common_1 = require("@nestjs/common");
var MessageRepository = /** @class */ (function (_super) {
    __extends(MessageRepository, _super);
    function MessageRepository(dataSource) {
        var _this = _super.call(this, message_1.Message, dataSource.createEntityManager()) || this;
        _this.dataSource = dataSource;
        return _this;
    }
    MessageRepository.prototype.paging = function (pagingRequest, messagesInput) {
        return __awaiter(this, void 0, void 0, function () {
            var seqNos, text, groupsInput, qb, where;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seqNos = messagesInput.seqNos, text = messagesInput.text, groupsInput = messagesInput.groupsInput;
                        qb = this.createQueryBuilder('m');
                        where = {};
                        seqNos && (where.seqNo = (0, typeorm_1.In)(seqNos));
                        text && (where.text = (0, typeorm_1.Like)("%".concat(text, "%")));
                        groupsInput &&
                            (where.group =
                                message_group_repository_1.MessageGroupRepository.getWhereByMessageGroupsInput(groupsInput));
                        return [4 /*yield*/, util_paging_1.UtilPaging.getRes(pagingRequest, qb.where(where), paged_messages_1.PagedMessages)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MessageRepository.prototype.hasRow = function (seqNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createQueryBuilder('m')
                            .where("m.seqNo = :seqNo", {
                            seqNo: seqNo
                        })
                            .getCount()];
                    case 1: return [2 /*return*/, ((_a.sent()) > 0)];
                }
            });
        });
    };
    MessageRepository.prototype.saveCustom = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.save(message_1.Message.create({
                        seqNo: p instanceof update_message_input_1.UpdateMessageInput ? p.seqNo : undefined,
                        text: p.text,
                        code: p.code,
                        name: p.name,
                        groupCode: p.groupCode
                    }))];
            });
        });
    };
    MessageRepository.prototype.findOneByMsgCode = function (msgCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne({
                            where: {
                                groupCode: msgCode.groupCode,
                                code: msgCode.code
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        (0, cache_manager_1.CacheKey)('test2')
    ], MessageRepository.prototype, "paging");
    MessageRepository = __decorate([
        (0, common_1.Injectable)()
    ], MessageRepository);
    return MessageRepository;
}(typeorm_1.Repository));
exports.MessageRepository = MessageRepository;
