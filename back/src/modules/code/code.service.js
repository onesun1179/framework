"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CodeService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var code_entity_1 = require("@modules/code/entities/code.entity");
var code_map_entity_1 = require("@modules/code/entities/code-map.entity");
var CodeService = /** @class */ (function () {
    function CodeService(codeRepository, codeTreeRepository) {
        this.codeRepository = codeRepository;
        this.codeTreeRepository = codeTreeRepository;
    }
    CodeService.prototype.getCodeRepository = function () {
        return this.codeRepository;
    };
    CodeService.prototype.getCodeTreeRepository = function () {
        return this.codeTreeRepository;
    };
    CodeService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(code_entity_1.Code)),
        __param(1, (0, typeorm_1.InjectRepository)(code_map_entity_1.CodeMap))
    ], CodeService);
    return CodeService;
}());
exports.CodeService = CodeService;
