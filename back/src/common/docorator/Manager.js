"use strict";
exports.__esModule = true;
exports.Manager = void 0;
var common_1 = require("@nestjs/common");
exports.Manager = (0, common_1.createParamDecorator)(function (data, context) {
    console.log('test', context);
    return 'test';
});
