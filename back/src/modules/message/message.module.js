"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessageModule = void 0;
var common_1 = require("@nestjs/common");
var message_service_1 = require("./message.service");
var message_resolver_1 = require("./resolvers/message.resolver");
var typeorm_1 = require("@nestjs/typeorm");
var Message_1 = require("./models/Message");
var MessageGroup_1 = require("./models/MessageGroup");
var messageGroup_resolver_1 = require("./resolvers/messageGroup.resolver");
var MessageModule = /** @class */ (function () {
    function MessageModule() {
    }
    MessageModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            exports: [message_service_1.MessageService],
            imports: [typeorm_1.TypeOrmModule.forFeature([Message_1.Message, MessageGroup_1.MessageGroup])],
            providers: [message_resolver_1.MessageResolver, messageGroup_resolver_1.MessageGroupResolver, message_service_1.MessageService]
        })
    ], MessageModule);
    return MessageModule;
}());
exports.MessageModule = MessageModule;
