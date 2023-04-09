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
var common_entity_1 = require("@common/entity/common.entity");
var icon_group_tree_1 = require("./icon-group-tree");
var icon_icon_group_map_1 = require("@modules/icon/model/icon-icon-group-map");
var IconGroup = /** @class */ (function (_super) {
    __extends(IconGroup, _super);
    function IconGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], IconGroup.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)()
    ], IconGroup.prototype, "name");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return icon_icon_group_map_1.IconIconGroupMap; }, function (o) { return o.iconGroup; })
    ], IconGroup.prototype, "iconIconGroupMaps");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return icon_group_tree_1.IconGroupTree; }, function (o) { return o.child; }),
        (0, graphql_1.Field)(function () { return [icon_group_tree_1.IconGroupTree]; })
    ], IconGroup.prototype, "children");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return icon_group_tree_1.IconGroupTree; }, function (o) { return o.parent; }),
        (0, graphql_1.Field)(function () { return [icon_group_tree_1.IconGroupTree]; })
    ], IconGroup.prototype, "parents");
    IconGroup = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlIconGroup')
    ], IconGroup);
    return IconGroup;
}(common_entity_1.CommonEntity));
exports.IconGroup = IconGroup;
