"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IconModule = void 0;
var common_1 = require("@nestjs/common");
var icon_service_1 = require("./icon.service");
var icon_resolver_1 = require("./icon.resolver");
var typeorm_1 = require("@nestjs/typeorm");
var icon_1 = require("./model/icon");
var icon_group_tree_1 = require("./model/icon-group-tree");
var icon_group_1 = require("./model/icon-group");
var icon_icon_group_map_1 = require("@modules/icon/model/icon-icon-group-map");
var IconModule = /** @class */ (function () {
    function IconModule() {
    }
    IconModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    icon_1.Icon,
                    icon_group_tree_1.IconGroupTree,
                    icon_group_1.IconGroup,
                    icon_icon_group_map_1.IconIconGroupMap,
                ]),
            ],
            providers: [icon_resolver_1.IconResolver, icon_service_1.IconService]
        })
    ], IconModule);
    return IconModule;
}());
exports.IconModule = IconModule;
