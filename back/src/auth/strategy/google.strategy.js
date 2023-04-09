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
exports.GoogleStrategy = void 0;
var passport_google_oauth20_1 = require("passport-google-oauth20");
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var GoogleStrategy = /** @class */ (function (_super) {
    __extends(GoogleStrategy, _super);
    function GoogleStrategy() {
        return _super.call(this, {
            clientID: process.env.OAUTH_GOOGLE_ID,
            clientSecret: process.env.OAUTH_GOOGLE_SECRET,
            callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
            scope: ['email', 'profile']
        }) || this;
    }
    GoogleStrategy.prototype.validate = function (accessToken, refreshToken, profile, done) {
        var id = profile.id;
        done(null, {
            id: id,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    };
    GoogleStrategy = __decorate([
        (0, common_1.Injectable)()
    ], GoogleStrategy);
    return GoogleStrategy;
}((0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google')));
exports.GoogleStrategy = GoogleStrategy;
