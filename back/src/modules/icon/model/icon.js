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
var common_entity_1 = require("@common/entity/common.entity");
var menu_1 = require("@modules/menu/model/menu");
var icon_icon_group_map_1 = require("@modules/icon/model/icon-icon-group-map");
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], Icon.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)()
    ], Icon.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)()
    ], Icon.prototype, "filePath");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return icon_icon_group_map_1.IconIconGroupMap; }, function (o) { return o.icon; })
    ], Icon.prototype, "iconIconGroupMaps");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return menu_1.Menu; }, function (o) { return o.icon; }, {
            nullable: true
        }),
        (0, graphql_1.Field)(function () { return [menu_1.Menu]; })
    ], Icon.prototype, "menus");
    Icon = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlIcon')
    ], Icon);
    return Icon;
}(common_entity_1.CommonEntity));
exports.Icon = Icon;
