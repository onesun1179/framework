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
exports.RouteService = void 0;
var common_1 = require("@nestjs/common");
var Route_1 = require("./models/Route");
var typeorm_1 = require("@nestjs/typeorm");
var RouteService = /** @class */ (function () {
    function RouteService(routeRepository) {
        this.routeRepository = routeRepository;
        this.logger = new common_1.Logger(RouteService_1.name);
    }
    RouteService_1 = RouteService;
    RouteService.prototype.getRouteRepository = function () {
        return this.routeRepository;
    };
    var RouteService_1;
    RouteService = RouteService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(Route_1.Route))
    ], RouteService);
    return RouteService;
}());
exports.RouteService = RouteService;
