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
exports.InsertRoleGroupRequest = void 0;
var graphql_1 = require("@nestjs/graphql");
var role_group_1 = require("../role-group");
var role_1 = require("../role");
var InsertRoleGroupRequest = /** @class */ (function (_super) {
    __extends(InsertRoleGroupRequest, _super);
    function InsertRoleGroupRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsertRoleGroupRequest.prototype.toRoleGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _b = (_a = role_group_1.RoleGroup).create;
                        _e = {
                            name: this.name
                        };
                        return [4 /*yield*/, role_1.Role.find({
                                where: this.roleSeqNos.length > 0
                                    ? this.roleSeqNos.map(function (seqNo) { return ({
                                        seqNo: seqNo
                                    }); })
                                    : []
                            })];
                    case 1:
                        _e.roles = _f.sent();
                        if (!(this.childSeqNos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, role_group_1.RoleGroup.find({
                                where: this.childSeqNos.map(function (seqNo) { return ({
                                    seqNo: seqNo
                                }); })
                            })];
                    case 2:
                        _c = _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _c = [];
                        _f.label = 4;
                    case 4:
                        _e.children = _c;
                        if (!(typeof this.parentSeqNo === 'number')) return [3 /*break*/, 6];
                        return [4 /*yield*/, role_group_1.RoleGroup.findOne({
                                where: {
                                    seqNo: this.parentSeqNo
                                }
                            })];
                    case 5:
                        _d = _f.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _d = null;
                        _f.label = 7;
                    case 7: return [2 /*return*/, _b.apply(_a, [(_e.parent = _d,
                                _e)])];
                }
            });
        });
    };
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            nullable: true,
            defaultValue: []
        })
    ], InsertRoleGroupRequest.prototype, "roleSeqNos");
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            nullable: true,
            defaultValue: []
        })
    ], InsertRoleGroupRequest.prototype, "childSeqNos");
    InsertRoleGroupRequest = __decorate([
        (0, graphql_1.InputType)(),
        (0, graphql_1.ArgsType)()
    ], InsertRoleGroupRequest);
    return InsertRoleGroupRequest;
}((0, graphql_1.PickType)(role_group_1.RoleGroup, [
    'name',
    'parentSeqNo',
])));
exports.InsertRoleGroupRequest = InsertRoleGroupRequest;
