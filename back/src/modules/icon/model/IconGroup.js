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
exports.IconGroup = void 0;
var typeorm_1 = require("typeorm");
var graphql_1 = require("@nestjs/graphql");
var common_entity_1 = require("../../../common/entity/common.entity");
var Icon_1 = require("./Icon");
var IconGroupTree_1 = require("./IconGroupTree");
var IconGroup = /** @class */ (function (_super) {
    __extends(IconGroup, _super);
    function IconGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            comment: '아이콘 그룹 일련번호'
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            description: '아이콘 그룹 일련번호'
        })
    ], IconGroup.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)({
            comment: '아이콘 그룹 명'
        }),
        (0, graphql_1.Field)({
            description: '아이콘 그룹 명'
        })
    ], IconGroup.prototype, "name");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Icon_1.Icon; }, function (o) { return o.iconGroup; }),
        (0, graphql_1.Field)(function () { return [Icon_1.Icon]; }, {
            description: '아이콘 목록'
        })
    ], IconGroup.prototype, "icons");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return IconGroupTree_1.IconGroupTree; }, function (o) { return o.child; }),
        (0, graphql_1.Field)(function () { return [IconGroupTree_1.IconGroupTree]; }, {
            description: '자식들'
        })
    ], IconGroup.prototype, "children");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return IconGroupTree_1.IconGroupTree; }, function (o) { return o.parent; }),
        (0, graphql_1.Field)(function () { return [IconGroupTree_1.IconGroupTree]; }, {
            description: '부모들'
        })
    ], IconGroup.prototype, "parents");
    IconGroup = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)({
            description: '아이콘 그룹'
        }),
        (0, graphql_1.InputType)('IconGroupIn', {
            isAbstract: true,
            description: '아이콘 그룹'
        })
    ], IconGroup);
    return IconGroup;
}(common_entity_1.CommonEntity));
exports.IconGroup = IconGroup;
