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
exports.__esModule = true;
exports.AppMetadataResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var AppMetadata_1 = require("../model/AppMetadata");
var AppMetadataResolver = /** @class */ (function () {
    function AppMetadataResolver(appMetadataService) {
        this.appMetadataService = appMetadataService;
    }
    AppMetadataResolver.prototype.appMetaData = function (name) {
        return this.appMetadataService.getAppMetaDataByName(name);
    };
    __decorate([
        (0, graphql_1.Query)(function () { return AppMetadata_1.AppMetadata; }),
        __param(0, (0, graphql_1.Args)('name', { type: function () { return String; } }))
    ], AppMetadataResolver.prototype, "appMetaData");
    AppMetadataResolver = __decorate([
        (0, graphql_1.Resolver)(function () { return AppMetadata_1.AppMetadata; })
    ], AppMetadataResolver);
    return AppMetadataResolver;
}());
exports.AppMetadataResolver = AppMetadataResolver;
