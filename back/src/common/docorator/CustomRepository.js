"use strict";
exports.__esModule = true;
exports.CustomRepository = exports.TYPEORM_EX_CUSTOM_REPOSITORY = void 0;
var common_1 = require("@nestjs/common");
exports.TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';
function CustomRepository(entity) {
    return (0, common_1.SetMetadata)(exports.TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
exports.CustomRepository = CustomRepository;
