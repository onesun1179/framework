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
exports.InsertAllFrontComponentInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var all_front_component_entity_1 = require("@modules/front-component/entities/all-front-component.entity");
var util_field_1 = require("@common/utils/util.field");
var InsertAllFrontComponentInput = /** @class */ (function (_super) {
    __extends(InsertAllFrontComponentInput, _super);
    function InsertAllFrontComponentInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsertAllFrontComponentInput = __decorate([
        (0, graphql_1.InputType)({
            description: util_field_1.UtilField.getFieldComment('all', 'front', 'component', 'insert', 'input')
        }),
        (0, graphql_1.ArgsType)()
    ], InsertAllFrontComponentInput);
    return InsertAllFrontComponentInput;
}((0, graphql_1.IntersectionType)((0, graphql_1.PickType)(all_front_component_entity_1.AllFrontComponent, ['id']), (0, graphql_1.PickType)((0, graphql_1.PartialType)(all_front_component_entity_1.AllFrontComponent), ['frontComponentId']))));
exports.InsertAllFrontComponentInput = InsertAllFrontComponentInput;
