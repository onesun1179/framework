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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("../../../common/entity/common.entity");
var Role_1 = require("../../role/model/Role");
var graphql_1 = require("@nestjs/graphql");
var util_common_1 = require("../../../common/util/util.common");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: 'varchar',
            length: 50,
            comment: util_common_1.UtilCommon.getFieldComment('user', 'id')
        }),
        (0, graphql_1.Field)({
            description: util_common_1.UtilCommon.getFieldComment('user', 'id')
        })
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            comment: util_common_1.UtilCommon.getFieldComment('role', 'seqNo')
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            description: util_common_1.UtilCommon.getFieldComment('role', 'seqNo')
        })
    ], User.prototype, "roleSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Role_1.Role; }, function (o) { return o.users; }),
        (0, graphql_1.Field)(function () { return Role_1.Role; }, {
            description: util_common_1.UtilCommon.getFieldComment('role')
        })
    ], User.prototype, "role");
    User = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)({
            description: util_common_1.UtilCommon.getFieldComment('user')
        }),
        (0, graphql_1.InputType)('UserIn', {
            isAbstract: true,
            description: util_common_1.UtilCommon.getFieldComment('user')
        })
    ], User);
    return User;
}(common_entity_1.CommonEntity));
exports.User = User;
