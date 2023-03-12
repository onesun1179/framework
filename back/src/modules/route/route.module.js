"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RouteModule = void 0;
var common_1 = require("@nestjs/common");
var route_controller_1 = require("./route.controller");
var route_service_1 = require("./route.service");
var typeorm_1 = require("@nestjs/typeorm");
var Route_1 = require("./models/Route");
var RoutesRoles_1 = require("./models/RoutesRoles");
var route_resolver_1 = require("./resolvers/route.resolver");
var routes_resolver_1 = require("./resolvers/routes.resolver");
var RouteModule = /** @class */ (function () {
    function RouteModule() {
    }
    RouteModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([Route_1.Route, RoutesRoles_1.RoutesRoles])],
            controllers: [route_controller_1.RouteController],
            providers: [route_service_1.RouteService, route_resolver_1.RouteResolver, routes_resolver_1.RoutesResolver],
            exports: [route_service_1.RouteService]
        })
    ], RouteModule);
    return RouteModule;
}());
exports.RouteModule = RouteModule;
