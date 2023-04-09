"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StringSearchInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var regex_input_1 = require("@common/dto/inputs/regex.input");
var like_input_1 = require("@common/dto/inputs/like.input");
var StringSearchInput = /** @class */ (function () {
    function StringSearchInput() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return regex_input_1.RegexInput; }, {
            nullable: true
        })
    ], StringSearchInput.prototype, "regex");
    __decorate([
        (0, graphql_1.Field)(function () { return like_input_1.LikeInput; }, {
            nullable: true
        })
    ], StringSearchInput.prototype, "like");
    StringSearchInput = __decorate([
        (0, graphql_1.InputType)(),
        (0, graphql_1.ArgsType)()
    ], StringSearchInput);
    return StringSearchInput;
}());
exports.StringSearchInput = StringSearchInput;
