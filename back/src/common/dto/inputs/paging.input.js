"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagingInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var PagingInput = /** @class */ (function () {
    function PagingInput() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return graphql_1.Int; }),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.IsOptional)()
    ], PagingInput.prototype, "skip");
    __decorate([
        (0, graphql_1.Field)(function () { return graphql_1.Int; }),
        (0, class_validator_1.Min)(1),
        (0, class_validator_1.Max)(50),
        (0, class_validator_1.IsOptional)()
    ], PagingInput.prototype, "take");
    PagingInput = __decorate([
        (0, graphql_1.InputType)(),
        (0, graphql_1.ArgsType)()
    ], PagingInput);
    return PagingInput;
}());
exports.PagingInput = PagingInput;
