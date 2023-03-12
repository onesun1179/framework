"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CodeModule = void 0;
var common_1 = require("@nestjs/common");
var code_service_1 = require("./code.service");
var code_controller_1 = require("./code.controller");
var typeorm_1 = require("@nestjs/typeorm");
var Code_1 = require("./model/Code");
var CodeTree_1 = require("./model/CodeTree");
var CodeModule = /** @class */ (function () {
    function CodeModule() {
    }
    CodeModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([Code_1.Code, CodeTree_1.CodeTree])],
            controllers: [code_controller_1.CodeController],
            providers: [code_service_1.CodeService]
        })
    ], CodeModule);
    return CodeModule;
}());
exports.CodeModule = CodeModule;
