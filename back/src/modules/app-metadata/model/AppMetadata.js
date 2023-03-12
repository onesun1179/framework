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
exports.AppMetadata = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("../../../common/entity/common.entity");
var graphql_1 = require("@nestjs/graphql");
var AppMetadata = /** @class */ (function (_super) {
    __extends(AppMetadata, _super);
    function AppMetadata() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            comment: '앱 메타 데이터 명'
        }),
        (0, graphql_1.Field)(function () { return String; }, {
            description: '앱 메타 데이터 명'
        })
    ], AppMetadata.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({
            comment: '앱 메타 데이터 값'
        }),
        (0, graphql_1.Field)(function () { return String; }, {
            description: '앱 메타 데이터 값'
        })
    ], AppMetadata.prototype, "value");
    AppMetadata = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)({
            description: '앱 메타 데이터'
        })
    ], AppMetadata);
    return AppMetadata;
}(common_entity_1.CommonEntity));
exports.AppMetadata = AppMetadata;
