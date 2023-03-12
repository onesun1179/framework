"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppMetadataModule = void 0;
var common_1 = require("@nestjs/common");
var app_metadata_service_1 = require("./app-metadata.service");
var app_metadata_resolver_1 = require("./resolvers/app-metadata.resolver");
var typeorm_1 = require("@nestjs/typeorm");
var AppMetadata_1 = require("./model/AppMetadata");
var AppMetadataModule = /** @class */ (function () {
    function AppMetadataModule() {
    }
    AppMetadataModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            exports: [app_metadata_service_1.AppMetadataService],
            imports: [typeorm_1.TypeOrmModule.forFeature([AppMetadata_1.AppMetadata])],
            providers: [app_metadata_resolver_1.AppMetadataResolver, app_metadata_service_1.AppMetadataService]
        })
    ], AppMetadataModule);
    return AppMetadataModule;
}());
exports.AppMetadataModule = AppMetadataModule;
