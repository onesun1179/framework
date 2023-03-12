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
exports.IconGroupTree = void 0;
var typeorm_1 = require("typeorm");
var graphql_1 = require("@nestjs/graphql");
var common_entity_1 = require("../../../common/entity/common.entity");
var IconGroup_1 = require("./IconGroup");
var IconGroupTree = /** @class */ (function (_super) {
    __extends(IconGroupTree, _super);
    function IconGroupTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            comment: '자식 일련번호'
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            description: '자식 일련번호'
        })
    ], IconGroupTree.prototype, "childSeqNo");
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            comment: '부모 일련번호'
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            description: '부모 일련번호'
        })
    ], IconGroupTree.prototype, "parentSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return IconGroup_1.IconGroup; }, function (o) { return o.children; }),
        (0, typeorm_1.JoinColumn)({
            name: 'child_seq_no'
        }),
        (0, graphql_1.Field)(function () { return IconGroup_1.IconGroup; }, {
            description: '자식'
        })
    ], IconGroupTree.prototype, "child");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return IconGroup_1.IconGroup; }, function (o) { return o.parents; }),
        (0, typeorm_1.JoinColumn)({
            name: 'parent_seq_no'
        }),
        (0, graphql_1.Field)(function () { return IconGroup_1.IconGroup; }, {
            description: '부모'
        })
    ], IconGroupTree.prototype, "parent");
    IconGroupTree = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)({
            description: '아이콘 그룹 트리'
        }),
        (0, graphql_1.InputType)('IconGroupTreeIn', {
            isAbstract: true,
            description: '아이콘 그룹 트리'
        })
    ], IconGroupTree);
    return IconGroupTree;
}(common_entity_1.CommonEntity));
exports.IconGroupTree = IconGroupTree;
