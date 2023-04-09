"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FrontComponentModule = void 0;
var common_1 = require("@nestjs/common");
var front_component_service_1 = require("./front-component.service");
var front_component_resolver_1 = require("./resolvers/front-component.resolver");
var typeorm_1 = require("@nestjs/typeorm");
var front_component_entity_1 = require("./entities/front-component.entity");
var all_front_component_resolver_1 = require("@modules/front-component/resolvers/all-front-component.resolver");
var all_front_component_entity_1 = require("@modules/front-component/entities/all-front-component.entity");
var TypeOrmExModule_1 = require("@common/modules/TypeOrmExModule");
var all_front_component_repository_1 = require("@modules/front-component/repositories/all-front-component.repository");
var front_component_repository_1 = require("@modules/front-component/repositories/front-component.repository");
var route_module_1 = require("@modules/route/route.module");
var FrontComponentModule = /** @class */ (function () {
    function FrontComponentModule() {
    }
    FrontComponentModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([all_front_component_entity_1.AllFrontComponent, front_component_entity_1.FrontComponent]),
                TypeOrmExModule_1.TypeOrmExModule.forCustomRepository([
                    all_front_component_repository_1.AllFrontComponentRepository,
                    front_component_repository_1.FrontComponentRepository,
                ]),
                route_module_1.RouteModule,
            ],
            providers: [
                front_component_resolver_1.FrontComponentResolver,
                all_front_component_resolver_1.AllFrontComponentResolver,
                front_component_service_1.FrontComponentService,
            ]
        })
    ], FrontComponentModule);
    return FrontComponentModule;
}());
exports.FrontComponentModule = FrontComponentModule;
