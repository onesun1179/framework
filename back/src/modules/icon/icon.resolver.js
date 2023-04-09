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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.IconResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var common_1 = require("@nestjs/common");
var icon_1 = require("./model/icon");
var menu_1 = require("@modules/menu/model/menu");
var process = require("process");
var IconResolver = /** @class */ (function () {
    function IconResolver(iconService) {
        this.iconService = iconService;
        this.logger = new common_1.Logger(IconResolver_1.name);
    }
    IconResolver_1 = IconResolver;
    IconResolver.prototype.icon = function (seqNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, icon_1.Icon.findOneBy({ seqNo: seqNo })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IconResolver.prototype.filePath = function (_a) {
        var filePath = _a.filePath;
        return process.env.FILE_PATH.concat(filePath);
    };
    IconResolver.prototype.menus = function (_a) {
        var seqNo = _a.seqNo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, icon_1.Icon.findOne({
                            select: ['menus'],
                            relations: {
                                menus: true
                            },
                            where: {
                                seqNo: seqNo
                            }
                        }).then(function (r) { return r === null || r === void 0 ? void 0 : r.menus; })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    var IconResolver_1;
    __decorate([
        (0, graphql_1.Query)(function () { return icon_1.Icon; }),
        __param(0, (0, graphql_1.Args)('seqNo', { type: function () { return graphql_1.Int; } }))
    ], IconResolver.prototype, "icon");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return String; }),
        __param(0, (0, graphql_1.Parent)())
    ], IconResolver.prototype, "filePath");
    __decorate([
        (0, graphql_1.ResolveField)(function () { return [menu_1.Menu]; }),
        __param(0, (0, graphql_1.Parent)())
    ], IconResolver.prototype, "menus");
    IconResolver = IconResolver_1 = __decorate([
        (0, graphql_1.Resolver)(function () { return icon_1.Icon; })
    ], IconResolver);
    return IconResolver;
}());
exports.IconResolver = IconResolver;
