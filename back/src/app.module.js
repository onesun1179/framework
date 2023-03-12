"use strict";
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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var path_1 = require("path");
var apollo_1 = require("@nestjs/apollo");
var typeorm_1 = require("@nestjs/typeorm");
var graphql_1 = require("@nestjs/graphql");
var typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var code_module_1 = require("./modules/code/code.module");
var user_module_1 = require("./modules/user/user.module");
var menu_module_1 = require("./modules/menu/menu.module");
var route_module_1 = require("./modules/route/route.module");
var role_module_1 = require("./modules/role/role.module");
var message_module_1 = require("./modules/message/message.module");
var app_metadata_module_1 = require("./modules/app-metadata/app-metadata.module");
var config_1 = require("@nestjs/config");
var front_component_module_1 = require("./modules/front-component/front-component.module");
var icon_module_1 = require("./modules/icon/icon.module");
var process = require("process");
var shell = require("shelljs");
var Joi = require("joi");
var auth_module_1 = require("./auth/auth.module");
var dropSchema = true;
// const dropSchema = false;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.onModuleInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (process.env.NODE_ENV === 'dev') {
                    shell.exec('npm run gql.cp');
                }
                return [2 /*return*/];
            });
        });
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    validationSchema: Joi.object({
                        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
                        DB_HOST: Joi.string().required(),
                        DB_PORT: Joi.string().required(),
                        DB_USERNAME: Joi.string().required(),
                        DB_PASSWORD: Joi.string().required(),
                        DB_NAME: Joi.string().required()
                    })
                }),
                common_1.CacheModule.register({
                    isGlobal: true
                }),
                // DevtoolsModule.register({
                //   http: process.env.NODE_ENV !== 'production',
                // }),
                typeorm_1.TypeOrmModule.forRoot({
                    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
                    type: 'mariadb',
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    autoLoadEntities: true,
                    // dropSchema: true,
                    dropSchema: false,
                    synchronize: true,
                    logging: true
                }),
                auth_module_1.AuthModule,
                role_module_1.RoleModule,
                code_module_1.CodeModule,
                user_module_1.UserModule,
                menu_module_1.MenuModule,
                route_module_1.RouteModule,
                message_module_1.MessageModule,
                app_metadata_module_1.AppMetadataModule,
                front_component_module_1.FrontComponentModule,
                icon_module_1.IconModule,
                graphql_1.GraphQLModule.forRoot({
                    driver: apollo_1.ApolloDriver,
                    debug: true,
                    playground: true,
                    autoTransformHttpErrors: true,
                    autoSchemaFile: (0, path_1.resolve)(process.cwd(), 'src', 'schema.gql'),
                    definitions: {
                        path: (0, path_1.resolve)(process.cwd(), 'src', '..', '..', 'front', 'graphql.ts'),
                        enumsAsTypes: true
                    },
                    formatError: function (e) {
                        delete e.extensions.exception;
                        return e;
                    }
                }),
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
