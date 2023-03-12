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
exports.Icon = void 0;
var typeorm_1 = require("typeorm");
var graphql_1 = require("@nestjs/graphql");
var common_entity_1 = require("../../../common/entity/common.entity");
var IconGroup_1 = require("./IconGroup");
var Menu_1 = require("../../menu/model/Menu");
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            comment: '아이콘 식별자'
        }),
        (0, graphql_1.Field)({
            description: '아이콘 식별자'
        })
    ], Icon.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            comment: '아이콘 파일경로'
        }),
        (0, graphql_1.Field)({
            description: '아이콘 파일 경로'
        })
    ], Icon.prototype, "filePath");
    __decorate([
        (0, typeorm_1.Column)({
            comment: '아이콘 그룹 일련번호'
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], Icon.prototype, "iconGroupSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return IconGroup_1.IconGroup; }, function (o) { return o.icons; }),
        (0, graphql_1.Field)(function () { return IconGroup_1.IconGroup; }, {
            description: '아이콘 그룹'
        }),
        (0, typeorm_1.JoinColumn)({
            name: 'icon_group_seq_no'
        })
    ], Icon.prototype, "iconGroup");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Menu_1.Menu; }, function (o) { return o.icon; }, {
            nullable: true
        }),
        (0, graphql_1.Field)(function () { return [Menu_1.Menu]; }, {
            description: '메뉴 목록',
            nullable: true
        })
    ], Icon.prototype, "menus");
    Icon = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)({
            description: '아이콘'
        }),
        (0, graphql_1.InputType)('IconIn', {
            isAbstract: true,
            description: '아이콘'
        })
    ], Icon);
    return Icon;
}(common_entity_1.CommonEntity));
exports.Icon = Icon;
