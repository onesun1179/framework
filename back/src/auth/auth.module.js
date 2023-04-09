"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
var auth_constant_1 = require("./auth.constant");
var google_auth_controller_1 = require("./controller/google-auth.controller");
var jwt_strategy_1 = require("./strategy/jwt.strategy");
var google_strategy_1 = require("./strategy/google.strategy");
var gql_auth_guard_1 = require("./guard/gql-auth.guard");
var auth_service_1 = require("./auth.service");
var user_module_1 = require("@modules/user/user.module");
var auth_resolver_1 = require("./resolvers/auth.resolver");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            imports: [
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    secret: auth_constant_1.JWT_SECRET,
                    signOptions: { expiresIn: '1day' }
                }),
                user_module_1.UserModule,
            ],
            exports: [auth_service_1.AuthService],
            controllers: [google_auth_controller_1.GoogleAuthController],
            providers: [
                auth_service_1.AuthService,
                jwt_strategy_1.JwtStrategy,
                gql_auth_guard_1.GqlAuthGuard,
                google_strategy_1.GoogleStrategy,
                auth_resolver_1.AuthResolver,
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
