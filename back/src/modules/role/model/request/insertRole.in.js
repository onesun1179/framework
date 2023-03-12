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
exports.InsertRoleIn = void 0;
var graphql_1 = require("@nestjs/graphql");
var Role_1 = require("../Role");
var util_common_1 = require("../../../../common/util/util.common");
var InsertRoleIn = /** @class */ (function (_super) {
    __extends(InsertRoleIn, _super);
    function InsertRoleIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, {
            description: util_common_1.UtilCommon.getFieldComment('user', 'seqNo', 's'),
            nullable: true
        })
    ], InsertRoleIn.prototype, "userIds");
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            description: util_common_1.UtilCommon.getFieldComment('menu', 'seqNo', 's'),
            nullable: true
        })
    ], InsertRoleIn.prototype, "menuSeqNos");
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            description: util_common_1.UtilCommon.getFieldComment('route', 'seqNo', 's'),
            nullable: true
        })
    ], InsertRoleIn.prototype, "routeSeqNos");
    InsertRoleIn = __decorate([
        (0, graphql_1.InputType)()
    ], InsertRoleIn);
    return InsertRoleIn;
}((0, graphql_1.PickType)(Role_1.Role, ['name', 'roleGroupSeqNo'])));
exports.InsertRoleIn = InsertRoleIn;
