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
exports.__esModule = true;
exports.RoutesRequest = exports.UpdateRouteRequest = exports.InsertRouteRequest = void 0;
var graphql_1 = require("@nestjs/graphql");
var route_1 = require("@modules/route/models/route");
var InsertRouteRequest = /** @class */ (function (_super) {
    __extends(InsertRouteRequest, _super);
    function InsertRouteRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            nullable: true
        })
    ], InsertRouteRequest.prototype, "childSeqNos");
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            nullable: true
        })
    ], InsertRouteRequest.prototype, "roleSeqNos");
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            nullable: true
        })
    ], InsertRouteRequest.prototype, "menuSeqNos");
    InsertRouteRequest = __decorate([
        (0, graphql_1.InputType)()
    ], InsertRouteRequest);
    return InsertRouteRequest;
}((0, graphql_1.OmitType)(route_1.Route, [
    'seqNo',
    'frontComponent',
    'parent',
    'roleRouteMaps',
    'menus',
])));
exports.InsertRouteRequest = InsertRouteRequest;
var UpdateRouteRequest = /** @class */ (function (_super) {
    __extends(UpdateRouteRequest, _super);
    function UpdateRouteRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateRouteRequest = __decorate([
        (0, graphql_1.InputType)()
    ], UpdateRouteRequest);
    return UpdateRouteRequest;
}((0, graphql_1.IntersectionType)((0, graphql_1.PickType)(route_1.Route, ['seqNo']), (0, graphql_1.PartialType)(InsertRouteRequest))));
exports.UpdateRouteRequest = UpdateRouteRequest;
var RoutesRequest = /** @class */ (function () {
    function RoutesRequest() {
        this.rootYn = false;
    }
    __decorate([
        (0, graphql_1.Field)(function () { return Boolean; }, {
            nullable: true,
            defaultValue: false
        })
    ], RoutesRequest.prototype, "rootYn");
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            nullable: true
        })
    ], RoutesRequest.prototype, "seqNos");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, {
            nullable: true
        })
    ], RoutesRequest.prototype, "path");
    __decorate([
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            nullable: true
        })
    ], RoutesRequest.prototype, "parentSeqNo");
    RoutesRequest = __decorate([
        (0, graphql_1.InputType)(),
        (0, graphql_1.ArgsType)()
    ], RoutesRequest);
    return RoutesRequest;
}());
exports.RoutesRequest = RoutesRequest;
